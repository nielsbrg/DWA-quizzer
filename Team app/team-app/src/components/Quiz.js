import React from 'react'
import {connect } from 'react-redux'
import changeAppTitle from '../actions/App/generalActions'
import { Button, Col} from 'react-bootstrap'
import '../css/Quiz.css'
import {updateAnswer, submitEmptyAnswer, changeAnswer} from "../actions/Quiz/answerActions";
import {clearErrors} from "../actions/Home/homeActions";
import {Error, Success} from "./messages/messages";

class Quiz extends React.Component {
    componentDidMount() {
        this.props.dispatch(changeAppTitle("Quizzer"));
        console.log(this.props.questionClosed);
        if(this.props.questionClosed) {
            this.props.history.push("/waiting");
        }
    }
    onSubmitAnswer() {
        this.props.dispatch(clearErrors());
        if(this.props.answer.length === 0) {
            this.props.dispatch(submitEmptyAnswer());
        }
        else {
            this.props.ws.send(JSON.stringify({
                messageType: "SUBMIT_ANSWER",
                question: this.props.currentQuestion,
                answer: this.props.answer
            }));
        }
    }
    onChange(event) {
        this.props.dispatch(updateAnswer(event.target.value));
    }
    cancelSubmit() {
        this.props.dispatch(changeAnswer());
    }
    componentDidUpdate() {
        if(this.props.questionClosed) {
            this.props.history.push("/waiting");
        }
    }
    render() {
        const { hasAnswered, answeredSuccessMsg:successMsg, timesAnswered } = this.props;
        return (
            <div className="App">
                <h1 className="App-title">{this.props.title}</h1>
                <div id="quizInformation">
                    <p className="text">{this.props.currentQuestion}</p>
                    <p className="text">You are {this.props.name}</p>
                    <Error condition={!hasAnswered && timesAnswered > 0} text="Your last registered answer will be evaluated."/>
                    <Success text={successMsg}
                             condition={hasAnswered && successMsg.length > 0}/>
                    {
                        this.props.validationErrors.map((x, i) => <Error text={x} key={i} condition={true}/>)
                    }
                </div>
                <Col className={`${hasAnswered ? 'inactive' : 'active'}`} id="questionAnswerCol"
                     xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4} >
                    <textarea onChange={this.onChange.bind(this)} id="questionAnswerArea"/>
                    <Button onClick={this.onSubmitAnswer.bind(this)} className="button">Submit answer</Button>
                </Col>
                <Button id="changeAnswerButton"
                        className={`button ${hasAnswered ? "active" : "inactive"}`} onClick={this.cancelSubmit.bind(this)}>Change answer</Button>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        currentQuestion: store.quiz.currentQuestion,
        name: store.home.nameField.value,
        title: store.appTitle,
        answer: store.quiz.answer,
        ws: store.ws.conn,
        answeredSuccessMsg: store.quiz.answeredSuccess,
        validationErrors: store.quiz.validationErrors,
        hasAnswered: store.quiz.hasAnswered,
        timesAnswered: store.quiz.timesAnswered,
        questionClosed: store.quiz.questionClosed
    }
})(Quiz)