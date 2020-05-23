import React from 'react'
import {changeAppTitle, clearErrors} from "../../actions/App/generalAppActions";
import {connect} from "react-redux";
import AnswerBox from "./AnswerBox";
import '../../css/Answers.css'
import {Button, Col} from 'react-bootstrap'
import {onNextQuestionWithoutAllApproved, recordQuestionResults} from "../../actions/Quiz/answerActions";
import {Error} from "../Messages/messages";
import {calculateRoundPoints, setQuestionNr, showEndRoundModal} from "../../actions/Quiz/roundActions";
import EndRoundModal from "./EndRoundModal";

class Answers extends React.Component {
    componentDidMount() {
        this.props.dispatch(changeAppTitle("Answers"));
    }
    onNextQuestion() {
        this.props.dispatch(clearErrors());
        for(let obj of this.props.answers) {
            if(!obj.hasOwnProperty("approved")) {
                this.props.dispatch(onNextQuestionWithoutAllApproved());
                return;
            }
        }
        const {currentQuestion:question, answers, currentRoundNumber:round, quizId, teamResults} = this.props;
        this.props.dispatch(recordQuestionResults(quizId, round, question, answers, teamResults))
            .then(res => {
                if(this.props.currentQuestionNumber === this.props.MAX_QUESTIONS_PER_ROUND) {
                    this.onEndRound();
                }
                else {
                    this.props.dispatch(setQuestionNr(this.props.currentQuestionNumber + 1));
                    this.props.ws.send(JSON.stringify({messageType: "START_NEW_QUESTION"}));
                    this.props.history.push(`/quiz/selectQuestion`);
                }
            }).catch(err => console.log(err));
    }
    onEndRound() {
        this.props.dispatch(calculateRoundPoints(this.props.currentRoundNumber));
        this.props.dispatch(showEndRoundModal(true));
    }
    render() {
        const {currentQuestion:question, currentQuestionNumber} = this.props;
        return (
            <div className="App">
                <h1 className="App-title">{this.props.title}</h1>
                <div id="messageList">
                    <p id="questionDisplayText" className="text">{this.props.currentQuestion.question}</p>
                    {
                        this.props.validationErrors.map((x,i) => <Error text={x} key={i} condition={true}/>)
                    }
                </div>
                <Col lg={12} md={12} sm={12} xs={12} id="answersDiv">
                    {
                        this.props.answers.map((x, i) => {
                            return (
                                <AnswerBox key={i} isApproved={x.approved} teamName={x.teamName} rightAnswer={question.answer} answer={x.answer}/>
                            )
                        })
                    }
                </Col>
                <Button className={`button onNextQuestion`} onClick={this.onNextQuestion.bind(this)}>
                    {currentQuestionNumber === this.props.MAX_QUESTIONS_PER_ROUND ? "End round" : "Next question"}
                </Button>
                <EndRoundModal history={this.props.history}/>
            </div>
        )
    }
}

export default connect(store => {
    return {
        title: store.appTitle,
        currentQuestion: store.selectQuestion.selectedQuestion,
        answers: store.answers.teamAnswers,
        validationErrors: store.answers.validationErrors,
        currentQuestionNumber: store.questionNumber,
        quizId: store.quiz._id,
        currentRoundNumber: store.roundNumber,
        ws: store.ws.conn,
        MAX_QUESTIONS_PER_ROUND: store.quizSettings.MAX_QUESTIONS_PER_ROUND,
        teams: store.lobby.teams,
        teamResults: store.teams.teams
    }
})(Answers);