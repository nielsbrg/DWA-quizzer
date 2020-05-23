import React from 'react'
import {connect} from "react-redux";
import {changeAppTitle} from "../../actions/App/generalAppActions";
import '../../css/Waiting.css'
import { Button } from 'react-bootstrap'
import {Success} from "../Messages/messages";

class Waiting extends React.Component {
    componentDidMount() {
        const {currentRoundNumber, currentQuestionNumber}  = this.props;
        this.props.dispatch(changeAppTitle(`Round ${currentRoundNumber} - Question ${currentQuestionNumber}`));

    }
    onCloseQuestion() {
        this.props.ws.send(JSON.stringify({
            messageType: "CLOSE_QUESTION"
        }));
    }
    componentDidUpdate() {
        if(this.props.showQuestionResults) {
            this.props.history.push("/quiz/answers")
        }
    }
    render() {
        const showEveryoneSubmitted = this.props.teams.length === this.props.teamsAnswered.size;
        return (
            <div className="App">
                <h1 className="App-title">{this.props.title}</h1>
                <div id="messageList">
                    <p id="questionDisplayText" className="text">{this.props.currentQuestion.question}</p>
                </div>
                <Success text={"Everyone has submitted."} condition={showEveryoneSubmitted}/>
                <Button onClick={this.onCloseQuestion.bind(this)} id="closeQuestionButton" className={`button`}>Close question</Button>
            </div>
        )
    }
}

export default connect(store => {
    return {
        title: store.appTitle,
        currentRoundNumber: store.roundNumber,
        currentQuestionNumber: store.questionNumber,
        currentQuestion: store.selectQuestion.selectedQuestion,
        teamsAnswered: store.waiting.teamsAnswered,
        teams: store.lobby.teams,
        ws: store.ws.conn,
        showQuestionResults: store.waiting.showQuestionResults
    }
})(Waiting)