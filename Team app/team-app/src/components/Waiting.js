import React from 'react'
import { Col, Button } from 'react-bootstrap'
import {Error, Loading, Success} from './messages/messages'
import { connect } from 'react-redux'
import changeAppTitle from "../actions/App/generalActions";
import {Redirect} from "react-router-dom";
import '../css/Waiting.css'

class Waiting extends React.Component {
    componentDidMount() {
        this.props.dispatch(changeAppTitle("Quizzer Team App"));
    }
    onCancelApply() {
        this.props.ws.conn.send(JSON.stringify({
            messageType: "CANCEL_APPLY",
            name: this.props.name
        }));
        this.props.ws.conn.close();
    }
    onReady() {
        this.props.ws.conn.send(JSON.stringify({
            messageType: "TOGGLE_READYSTATE",
            name: this.props.name,
            isReady: !this.props.isReady
        }));
    }
    render() {
        if(this.props.showHome || this.props.name.length === 0) {
            return <Redirect to="/"/>
        }
        if(this.props.showQuiz) {
            return <Redirect to="/quiz"/>
        }
        const {isReady, isAccepted, currentMsg, isLoading, quizStarted, isConnected, isAnswerCorrect, questionClosed} = this.props;
        return (
            <div className="App">
                <h1 className="App-title">{this.props.title}</h1>
                <Loading text={"Verifying..."} condition={isLoading}/>
                <div className={`${isLoading ? "inactive" : "active"}`}>
                    <div id="messageList">
                        <p className="text">{currentMsg}</p>
                        <div className={`${(questionClosed && isAnswerCorrect !== undefined) ? "active" : "inactive"}`}>
                            <Success text={"The quiz master thinks your answer is correct!"} condition={isAnswerCorrect}/>
                            <Error text={"The quiz master disapproved of your answer."} condition={!isAnswerCorrect}/>
                        </div>
                    </div>
                    <Col mdOffset={4} md={4} sm={6} smOffset={3} xs={12}>
                        <div className={`${(quizStarted || !isAccepted) ? "inactive" : "active"}`}>
                            <Error text="You are not ready!" condition={!isReady && isAccepted}/>
                            <Success text={"You are ready"} condition={isReady && isAccepted}/>
                        </div>
                        <p className="text">Your name: {this.props.name}</p>
                        <div className={`${quizStarted ? "inactive" : "active"}`}>
                            <Button className={`${isConnected ? "active" : "inactive"} button cancelButton`} onClick={this.onCancelApply.bind(this)}>Cancel</Button>
                            <Button
                            className={`button readyButton ${isAccepted ? "activeReadyButton" : "inactive"}`}
                            onClick={this.onReady.bind(this)}>I am {isReady ? "not" : ""} ready!</Button>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        ws: store.ws,
        isReady: store.waiting.isReady,
        title: store.appTitle,
        isAccepted: store.waiting.isAccepted,
        name: store.home.nameField.value,
        currentMsg: store.waiting.currentMsg,
        showHome: store.waiting.showHome,
        isLoading: store.waiting.isLoading,
        isConnected: store.waiting.isConnected,
        quizStarted: store.waiting.quizStarted,
        showQuiz: store.waiting.showQuiz,
        questionClosed: store.quiz.questionClosed,
        isAnswerCorrect: store.waiting.isAnswerCorrect
    }
})(Waiting);