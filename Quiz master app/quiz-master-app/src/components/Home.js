import React from 'react';
import '../css/Home.css'
import { Col, Button, FormGroup } from 'react-bootstrap'
import { changeQuizMasterName, changePassword, registerQuizInvalid, changeNameTouched, changePasswordTouched} from "../actions/Home/inputActions";
import { createNewQuiz} from '../actions/Home/inputActions'
import { populateErrMsg, populateSuccessMsg } from '../actions/App/generalAppActions'
import { connect } from 'react-redux'
import {Success, Error, Loading } from './Messages/messages'
import {changeAppTitle} from "../actions/App/generalAppActions";

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(changeAppTitle("Quizzer"));
    }
    onClickStartQuiz() {
        if(this.props.quizLoadSuccessMsg.length > 0) {
            return;
        }
        if(this.props.name.length === 0 || this.props.password.length === 0) {
            this.props.dispatch(registerQuizInvalid(this.props.timesSubmitted));
        }
        else {
            this.props.dispatch(createNewQuiz(this.props.name, this.props.password))
            .then(res => {
                this.props.dispatch(populateSuccessMsg("Successfully created a quiz! Creating a lobby where people can join your quiz..."))
            })
            .then(res => {
                setTimeout(() => this.props.history.push("/lobby"), 500);
            })
            .catch(err => {
                if(this.props.quizLoadErr) {
                    if(this.props.quizLoadErr.message.indexOf("There was already a quiz") !== -1) {
                        this.props.dispatch(populateErrMsg(this.props.quizLoadErr.message));
                    }
                }
            });
        }
    }
    render() {
        const { dispatch, title, name, password, quizLoadErrMsg, isLoading, quizLoadSuccessMsg, timesSubmitted, quizEndMsg } = this.props;
        const showSuccess = quizLoadSuccessMsg.length > 0 && quizLoadErrMsg.length === 0;
        const showPasswordValidationError = timesSubmitted > 0 && password.length === 0;
        const showNameValidationError = timesSubmitted > 0 && name.length === 0;

        return (
        <div className="App">
            <h1 className="App-title">{title}</h1>
            <div id="messageList">
                <Error text="Quiz master name is required" condition={showNameValidationError}/>
                <Error text="Password is required" condition={showPasswordValidationError}/>
                <Error text={quizLoadErrMsg} condition={quizLoadErrMsg.length > 0 && !isLoading}/>
                <Success text={quizLoadSuccessMsg} condition={showSuccess}/>
                <Success text={quizEndMsg} condition={quizEndMsg.length > 0 && timesSubmitted === 0}/>
                <Loading text={"Trying to create a new quiz with " + name + " and " + password} condition={isLoading}/>
            </div>
            <form>
                <Col lg={4} lgOffset={4} mdOffset={4} md={4} xs={10} xsOffset={1} sm={6} smOffset={3} className="startQuizForm">
                    <Col lg={8} lgOffset={2}>
                        <FormGroup validationState=
                               {
                                   showNameValidationError ? "error" : null
                               }>
                            <label htmlFor="quizMasterName" className="quizMasterName text">Quiz master name</label>
                            <input
                                id="quizMasterName"
                                type="text"
                                onChange={event => {
                                    dispatch(changeQuizMasterName({value: event.target.value, touched: true}))
                                }}
                                onFocus={event => dispatch(changeNameTouched({touched: true}))}
                                onBlur={event => dispatch(changeNameTouched({touched: false}))}
                                defaultValue={name}
                                className="form-control"/>
                        </FormGroup>
                    </Col>
                    <Col lg={8} lgOffset={2}>
                        <FormGroup validationState={showPasswordValidationError ? "error" : null}>
                            <label htmlFor="password" className="password text">Password</label>
                            <input
                                id="password"
                                type="text"
                                onChange={event => {
                                    dispatch(changePassword({ value: event.target.value, touched: true }))
                                }}
                                onFocus={event => dispatch(changePasswordTouched({touched: true}))}
                                onBlur={event => dispatch(changePasswordTouched({touched: false}))}
                                defaultValue={password}
                                className="form-control"/>
                        </FormGroup>
                    </Col>
                    <Col lg={8} lgOffset={2} className="startQuizButtonHome">
                        <FormGroup>
                            <Button onClick={this.onClickStartQuiz.bind(this)} className="button">Start a quiz</Button>
                        </FormGroup>
                    </Col>
                </Col>
            </form>
        </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        nameTouched: store.home.nameField.touched,
        name: store.home.nameField.value,
        password: store.home.passwordField.value,
        passwordTouched: store.home.passwordField.touched,
        title: store.appTitle,
        timesSubmitted: store.home.timesSubmitted,
        quizLoadErr: store.home.quizLoadErr,
        quizLoadErrMsg: store.home.quizLoadErrMsg,
        quizLoadSuccessMsg: store.home.quizLoadSuccessMsg,
        isLoading: store.home.isLoading,
        isWaiting: store.home.isWaiting,
        quizEndMsg: store.home.quizEndMsg
    }
}

export default connect(mapStateToProps)(Home);
