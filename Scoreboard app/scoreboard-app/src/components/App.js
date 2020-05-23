import React from 'react';
import '../css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './Home'
import Scoreboard from "./Quiz/Scoreboard";
import {connect} from "react-redux";
import {onWsClose, onWsError, onWsOpen, storeWsConnection, updateBasedOnMessage} from "../actions/App/wsActions";
import QuizEnd from "./QuizEnd";

class App extends React.Component {
    componentDidUpdate() {
        if(this.props.ws.shouldConnect) {
            console.log("CONNECTING TO WS");
            let connection = new WebSocket("ws://localhost:8080/quizzerWS");
            connection.onmessage = this.onMessage.bind(this);
            connection.onclose = this.onClose.bind(this);
            connection.onerror = this.onError.bind(this);
            connection.onopen = evt => {
                this.props.dispatch(onWsOpen());
                this.props.dispatch(storeWsConnection(connection));
            };
        }
    }
    onMessage(msg) {
        this.props.dispatch(updateBasedOnMessage(JSON.parse(msg.data)));
    }
    onClose() {
        console.log("WS CLOSE");
        this.props.dispatch(onWsClose());
    }
    onError(err) {
        this.props.dispatch(onWsError(err.message));
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/scoreboard" component={Scoreboard}/>
                    <Route path="/quizEnd" component={QuizEnd}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect(store => {
    return {
        ws: store.ws
    }
})(App);
