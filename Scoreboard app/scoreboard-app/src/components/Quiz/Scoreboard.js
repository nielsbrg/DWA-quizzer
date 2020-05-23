import React from 'react'
import {connect} from "react-redux";
import {Error, Loading, Success} from "../messages";
import {getRoundInformation} from "../../actions/scoreboard/getRoundInformation";
import {addErrorMessage} from "../../actions/scoreboard/addMessage";
import '../../css/Scoreboard.css'
import '../../css/Answers.css'
import QuestionInformation from "./QuestionInformation";
import {Row} from 'react-bootstrap'

import TeamAnswerInformation from "./TeamAnswerInformation";
import TeamDataTable from "./TeamDataTable";
import {calculateTopThreeScores} from "../../actions/scoreboard/calculateTopThreeScores";

class Scoreboard extends React.Component {
    componentDidUpdate() {
        if(this.props.isCurrentlyActive !== undefined) {
            if(this.props.isCurrentlyActive) {
                if(this.props.quizHasEnded) {
                    this.props.dispatch(calculateTopThreeScores(this.props.teamsWithRoundResults));
                    this.props.history.push("/quizEnd");
                }
            }
            else if(this.props.fetchRoundInformation && this.props.quiz.quizId !== undefined) {
                console.log(this.props);
                this.props.dispatch(addErrorMessage("QUIZ_NOT_ACTIVE", "The quiz is currently not active. Showing the last recorded quiz results."));
                this.props.dispatch(getRoundInformation(this.props.quiz.quizId));
            }
        }
    }
    generateTeamData() {
        return this.props.teamsWithRoundResults.map((x, i) => {
            return <TeamDataTable key={i} teamName={x.name} totalRP={x.totalRoundPoints} roundResults={x.roundResults}/>
        })
    }
    render() {
        const {isLoading} = this.props;
        return (
            <div className="App">
                <h1 className="App-title">Quiz Results</h1>
                <div id="messageList">
                    {this.props.errors.map((errorMsg, i) => <Error key={i} text={errorMsg} condition={true}/>)}
                    {this.props.messages.map((msg, i) => <p key={i} className="text">{msg}</p>)}
                    {this.props.successMessages.map((msg, i) => <Success key={i} text={msg} condition={true}/>)}
                    <Loading text={"Loading quiz data..."} condition={isLoading}/>
                </div>
                <QuestionInformation/>
                <Row className="text-left text-padding">
                    <TeamAnswerInformation/>
                </Row>
                <div id="teamDataTables">
                    {
                        this.props.teamsWithRoundResults === undefined ? <div/> : this.generateTeamData()
                    }
                </div>
            </div>
        )
    }
}

export default connect(store => {
    return {
        errors: store.scoreboard.errors,
        quiz: store.quiz,
        ws: store.ws.conn,
        isLoading: store.scoreboard.isLoading,
        messages: store.scoreboard.messages,
        isCurrentlyActive: store.scoreboard.isCurrentlyActive,
        teamsWithRoundResults: store.quiz.teamsWithRoundResults,
        fetchRoundInformation: store.scoreboard.fetchRoundInformation,
        successMessages: store.scoreboard.successMessages,
        quizHasEnded: store.scoreboard.quizHasEnded
    }
})(Scoreboard);