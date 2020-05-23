import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../../css/Lobby.css'
import ApplicantsList from './ApplicantsList'
import ParticipantList from './ParticipantsList'
import storeWSConnection from '../../actions/Lobby/storeWsConnection'
import {wsConnectionFailed, wsConnectionSuccess} from "../../actions/Lobby/wsConnectionState";
import {Error, Loading, Success} from '../Messages/messages'
import {Button, Col} from 'react-bootstrap'
import KickParticipantModal from './KickParticipantModal'
import dispatchBasedOnMessage from '../../actions/Lobby/wsActions'
import NotAllTeamsReadyModal from "./NotAllTeamsReadyModal";
import {
    notAllTeamsReady, setTeamsForQuiz, startQuizNoTeams, quizHasStarted,
    updateStartQuizAfterModalWarning
} from "../../actions/Lobby/startQuizActions";
import { clearErrors, changeAppTitle } from "../../actions/App/generalAppActions";
import {populateErrMsg} from "../../actions/App/generalAppActions";
import {setRoundNumber} from "../../actions/Quiz/roundActions";

class Lobby extends React.Component {
    componentDidMount() {
        if(this.props.title !== "Lobby") { this.props.dispatch(changeAppTitle("Lobby")); }
        if(!this.props.ws && this.props.quiz.hasOwnProperty("password") && this.props.quiz.hasOwnProperty("quizMaster")) {
            this.createWSConnection();
        }
    }
    componentDidUpdate() {
        if(this.props.startQuizAfterModalWarning) {
            this.startQuiz();
            this.props.dispatch(updateStartQuizAfterModalWarning());
        }
    }
    createWSConnection() {
        const connection = new WebSocket("ws://localhost:8080/quizzerWS");
        connection.onerror = err => this.onError(err, this.props.dispatch);
        connection.onmessage = this.onMessage.bind(this);
        connection.onclose = this.onWSClose.bind(this);
        connection.onopen = event => {
            this.props.dispatch(wsConnectionSuccess());
            connection.send(JSON.stringify({
                messageType: "INTRODUCTION_QUIZMASTER",
                name: this.props.quiz.quizMaster,
                password: this.props.quiz.password
            }));
        };
        this.props.dispatch(storeWSConnection(connection));
    }
    onMessage(msg) {
        this.props.dispatch(clearErrors());
        this.props.dispatch(dispatchBasedOnMessage(JSON.parse(msg.data)));
    }
    onWSClose() {
        this.props.dispatch(wsConnectionFailed());
    }
    onError(err) {
        this.props.dispatch(wsConnectionFailed());
    }
    onStartQuiz() {
        this.props.dispatch(clearErrors());
        if(this.props.teams.length === 0) {
            this.props.dispatch(startQuizNoTeams());
        }
        else if(this.allTeamsReady()) {
            this.startQuiz();
        }
        else {
            this.props.dispatch(notAllTeamsReady());
        }
    }
    startQuiz() {
        let teams = this.props.teams.map(x => x.name);
        this.props.dispatch(setTeamsForQuiz(this.props.quiz._id, teams))
            .then(res => {
                this.props.ws.send(JSON.stringify({messageType: "REFUSE_ALL_APPLICANTS"}));
                this.props.ws.send(JSON.stringify({messageType: "QUIZ_HAS_STARTED", teams: this.props.finalTeams}));
                this.props.dispatch(quizHasStarted());
            })
            .then(res => {
                this.props.dispatch(setRoundNumber(1));
                this.props.history.push("/quiz/startRound");
            })
            .catch(err => this.props.dispatch(populateErrMsg(err.message)));
    }
    allTeamsReady() {
        for(let team of this.props.teams) {
            if(!team.isReady) {
                return false;
            }
        }
        return true;
    }
    render() {
        if(!this.props.quiz["password"] || !this.props.quiz["quizMaster"]) {
            return <Redirect to="/" push={true}/>
        }
        const {quiz, applicants, title, wsConnectionErrMsg: wsErr, isLoading, wsConnectionSuccessMsg, password:pw} = this.props;
        const {quizMaster:qmName } = quiz;
        const showWsErr = wsErr.length > 0;
        if(quiz === undefined) { return (<Redirect to="/"/>) }
        return (
            <div className="App">
                <h1 className="App-title">{title}</h1>
                <div id="quizInfo">
                    <div className="text">Quiz master name: {qmName}</div>
                    <div className="text">Password: {pw}</div>
                    <div className="text">
                        Connection status:
                        <span className="connectionStatusText">
                            <Success text={wsConnectionSuccessMsg} condition={!isLoading && wsConnectionSuccessMsg && wsErr.length === 0}/>
                            <Loading text="Trying to establish connection" condition={isLoading && wsErr.length !== 0}/>
                            <div className={showWsErr && !isLoading ? "active" : "inactive"}>
                                <Error text={wsErr} condition={true}>
                                </Error>
                                <Button onClick={this.createWSConnection.bind(this)} className="button">Connect again</Button>
                            </div>
                        </span>
                    </div>
                    {this.props.validationErrors.map((x,i) => <Error key={i} text={x} condition={true}/>)}
                    <Loading text={"Finalizing teams..."} condition={this.props.isFinalizingTeams}/>
                </div>
                <Col lg={8} md={8} sm={6} xs={12} className="applicantListCol">
                    <ApplicantsList applicants={applicants} searchTerm={this.props.searchTerm}/>
                </Col>
                <Col lg={4} md={4} sm={6} xs={12} id="participantDiv">
                    <ParticipantList
                        participants={this.props.teams}
                        searchTerm={this.props.participantsSearchTerm}/>
                    <Button onClick={this.onStartQuiz.bind(this)} className=" startQuizButton button">Start</Button>
                </Col>
                <KickParticipantModal/>
                <NotAllTeamsReadyModal/>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        teams: store.lobby.teams,
        title: store.appTitle,
        quiz: store.quiz,
        password: store.home.passwordField.value,
        searchTerm: store.lobby.searchTerm,
        participantsSearchTerm: store.lobby.participantsSearchTerm,
        ws: store.ws.conn,
        applicants: store.lobby.applicants,
        wsConnectionErrMsg: store.ws.wsConnectionErrMsg,
        wsConnectionSuccessMsg: store.ws.wsConnectionSuccessMsg,
        isLoading: store.lobby.isLoading,
        checkStatusFor: store.lobby.checkStatusFor,
        validationErrors: store.lobby.validationErrors,
        isFinalizingTeams: store.lobby.isFinalizingTeams,
        startQuizAfterModalWarning: store.lobby.startQuizAfterModalWarning,
        finalTeams: store.teams.teams
    }
}

export default connect(mapStateToProps)(Lobby)