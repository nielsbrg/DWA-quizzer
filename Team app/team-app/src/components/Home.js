import React from 'react';
import '../css/Home.css';
import { connect } from 'react-redux'
import { Error, Loading } from './messages/messages'
import { Col, Button, FormGroup } from 'react-bootstrap'
import { changeTeamName, changeNameTouched, changePassword, changePasswordTouched, startApplyForQuiz, clearErrors, onSubmit, startWaiting } from '../actions/Home/homeActions'
import changeTitle from '../actions/App/generalActions'
import {onWsClose, onWsFail, onWsOpen, onWsStart, storeWsConnection, updateOnMessage} from '../actions/App/wsActions'
import {onSubmitEmptyName, onSubmitEmptyPassword} from "../actions/Home/homeActions";

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(changeTitle("Quizzer Team App"));
    }
    componentDidUpdate() {
        if(this.props.shouldCloseWs) {
            this.props.ws.close();
            this.props.dispatch({type:"SHOULD_CLOSE_WS", payload: false});
        }
    }
    onJoinQuiz() {
        let errors = this.validateInput();
        if(errors.length === 0) {
            this.props.dispatch(startApplyForQuiz());
            if(!this.props.ws.conn) {
                this.createWSConnection();
            }
            else {
                this.applyForQuiz(this.props.ws.conn);
            }
        }
    }
    validateInput() {
        let errors = [];
        this.props.dispatch(clearErrors());
        this.props.dispatch(onSubmit(this.props.timesSubmitted));
        if(this.props.name.length === 0) {
            this.props.dispatch(onSubmitEmptyName());
            errors.push(true);
        }
        if(this.props.password.length === 0) {
            this.props.dispatch(onSubmitEmptyPassword());
            errors.push(true);
        }
        return errors;
    }
    applyForQuiz(conn) {
        conn.send(JSON.stringify({
            messageType: "APPLY",
            name: this.props.name,
            password: this.props.password
        }));
        this.props.dispatch(startWaiting());
        this.props.history.push("/waiting");
    }
    createWSConnection() {
        this.props.dispatch(onWsStart());
        let connection = new WebSocket("ws://localhost:8080/quizzerWS");
        connection.onmessage = this.onMessage.bind(this);
        connection.onclose = this.onClose.bind(this);
        connection.onerror = this.onError.bind(this);
        connection.onopen = evt => {
            this.props.dispatch(onWsOpen());
            this.props.dispatch(storeWsConnection(connection));
            this.applyForQuiz(this.props.ws.conn);
        };
    }
    onMessage(msg) {
        this.props.dispatch(updateOnMessage(JSON.parse(msg.data)));
    }
    onClose() {
        this.props.dispatch(onWsClose());
    }
    onError() {
        this.props.dispatch(onWsFail());
    }
    render() {
        if(this.props.validationErrors.length > 0 && this.props.ws.conn) {
            this.props.ws.conn.close();
        }
        const {dispatch, title, name, password:pw, timesSubmitted } = this.props;
        return (
            <div className="App">
                <h1 className="App-title">{title}</h1>
                <div id="messageList">
                    {this.props.validationErrors.map((errorMsg, i) => <Error key={i} text={errorMsg} condition={true}/>)}
                </div>
                <form>
                    <Loading text={"Verifying..."} condition={this.props.isLoading}/>
                    <Col lg={4} lgOffset={4} mdOffset={4} md={4} xs={10} xsOffset={1} sm={6} smOffset={3} className="joinQuizForm regularCol">
                        <Col lg={8} lgOffset={2}>
                            <FormGroup validationState={name.length === 0 && timesSubmitted > 0 ? "error" : null}>
                                <label htmlFor="teamName" className="teamName text">Team name</label>
                                <input
                                    id="teamName"
                                    type="text"
                                    onChange={event => {
                                        dispatch(changeTeamName({value: event.target.value, touched: true}))
                                    }}
                                    onFocus={event => dispatch(changeNameTouched({touched: true}))}
                                    onBlur={event => dispatch(changeNameTouched({touched: false}))}
                                    defaultValue={name}
                                    className="form-control"/>
                            </FormGroup>
                        </Col>
                        <Col lg={8} lgOffset={2}>
                            <FormGroup validationState={pw.length === 0 && timesSubmitted > 0 ? "error" : null}>
                                <label htmlFor="password" className="password text">Password</label>
                                <input
                                    id="password"
                                    type="text"
                                    onChange={event => {
                                        dispatch(changePassword({ value: event.target.value, touched: true }))
                                    }}
                                    onFocus={event => dispatch(changePasswordTouched({touched: true}))}
                                    onBlur={event => dispatch(changePasswordTouched({touched: false}))}
                                    defaultValue={pw}
                                    className="form-control"/>
                            </FormGroup>
                        </Col>
                        <Col lg={8} lgOffset={2} className="startQuizButton">
                            <FormGroup>
                                <Button onClick={this.onJoinQuiz.bind(this)} className="button">Apply for quiz</Button>
                            </FormGroup>
                        </Col>
                    </Col>
                </form>
            </div>
        );
    }
}


function mapStateToProps(store) {
    return {
        nameTouched: store.home.nameField.touched,
        name: store.home.nameField.value,
        password: store.home.passwordField.value,
        passwordTouched: store.home.passwordField.touched,
        title: store.appTitle,
        ws: store.ws,
        validationErrors: store.home.validationErrors,
        isLoading: store.home.isLoading,
        timesSubmitted: store.home.timesSubmitted,
    }
}

export default connect(mapStateToProps)(Home);