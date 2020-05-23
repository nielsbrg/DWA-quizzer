import React from 'react';
import '../css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './Home'
import Lobby from './Lobby/Lobby'
import Quiz from './Quiz/Quiz'
import Waiting from './Quiz/Waiting'

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/lobby" component={Lobby}/>
                <Route path="/quiz" component={Quiz}/>
                <Route path="/waiting" component={Waiting}/>
                <Route component={Home}/>
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
