import React from 'react';
import '../css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './Home'
import Quiz from './Quiz'
import Waiting from './Waiting'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/waiting" component={Waiting}/>
                    <Route path="/quiz" component={Quiz}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
