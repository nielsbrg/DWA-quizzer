import React from 'react'
import {connect} from "react-redux";
import {Error, Loading} from "./messages";
import {Col, Button, FormGroup} from 'react-bootstrap'
import {changePassword, changePasswordTouched, clearErrors, submitEmptyPassword} from "../actions/home/inputActions";
import {onWsStart} from "../actions/App/generalAppActions";
import {endVerifyPassword, noQuizFound, startVerifyPassword, verifyPassword} from "../actions/home/submitPassword";

class Home extends React.Component {
    onSubmit(evt) {
        evt.preventDefault();
        this.props.dispatch(clearErrors());
        if(this.props.password.length > 0) {
            this.props.dispatch(onWsStart());
            this.waitForConnection(false);
        }
        else {
            this.props.dispatch(submitEmptyPassword());
        }
    }
    waitForConnection(repeat) {
        if(this.props.ws !== undefined) {
            if(!this.props.isVerifying) {
                this.props.dispatch(startVerifyPassword());
                this.checkPassword(this.props.password)
            }
        }
        else {
            setTimeout(() => { this.waitForConnection(true); }, 250);
        }
    }
    checkPassword(pw) {
        //on fulfill the quizReducer will store the quiz data from this promise.
        this.props.dispatch(verifyPassword(pw))
            .then(quiz => {
                this.props.dispatch(endVerifyPassword());
                this.props.ws.send(JSON.stringify({
                    messageType: "INTRODUCTION_SCOREBOARD",
                    password: pw
                }));
                this.props.history.push("/scoreboard");
            })
            .catch(err => {
                this.props.dispatch(endVerifyPassword());
                if(err.status === 404) {
                    this.props.dispatch(noQuizFound("Quiz not found."));
                    this.props.ws.close();
                }
                else {
                    throw err;
                }
            });
    }
    render() {
        const { dispatch } = this.props;
        return (
            <div className="App">
                <h1 className="App-title">Quizzer Scoreboard App</h1>
                <p className="text">To see results/progress of a quiz, please provide a password.</p>
                <div id="messageList">
                    {this.props.validationErrors.map((errorMsg, i) => <Error key={i} text={errorMsg} condition={true}/>)}
                </div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <Loading text={"Verifying..."} condition={this.props.isLoading}/>
                    <Col lg={4} lgOffset={4} mdOffset={4} md={4} xs={10} xsOffset={1} sm={6} smOffset={3}>
                        <Col lg={8} lgOffset={2}>
                            <FormGroup validationState={this.props.validationErrors.length > 0 && !this.props.touched ? "error" : null}>
                                <input
                                    id="password"
                                    onChange={event => dispatch(changePassword(event.target.value))}
                                    onFocus={event => dispatch(changePasswordTouched(true))}
                                    onBlur={event => dispatch(changePasswordTouched(false))}
                                    defaultValue={this.props.password}
                                    className="form-control"/>
                            </FormGroup>
                        </Col>
                        <Col lg={8} lgOffset={2}>
                            <FormGroup>
                                <Button type="submit" className="button">Show me data for this quiz</Button>
                            </FormGroup>
                        </Col>
                    </Col>
                </form>
            </div>
        )
    }
}

export default connect(store => {
    return {
        validationErrors: store.home.validationErrors,
        password: store.home.passwordField.value,
        touched: store.home.passwordField.touched,
        isLoading: store.home.isLoading,
        ws: store.ws.conn,
        isVerifying: store.home.isVerifying,

    }
})(Home);