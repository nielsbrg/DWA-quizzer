import React from 'react';
import '../../css/StartRound.css';
import {Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import StartRound from './StartRound'
import SelectQuestion from './SelectQuestion'
import Waiting from "./Waiting";
import Answers from "./Answers";

class Quiz extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/startRound`} component={StartRound}/>
                <Route path={`${this.props.match.url}/selectQuestion`} component={SelectQuestion}/>
                <Route path={`${this.props.match.url}/answers`} component={Answers}/>
                <Route path={`${this.props.match.url}/waiting`} component={Waiting}/>
            </Switch>
        )
    }
}

function mapStateToProps(store) {
    return {
        title: store.appTitle
    }
}

export default connect(mapStateToProps)(Quiz);