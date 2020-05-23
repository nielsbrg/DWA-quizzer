import React from 'react'
import {connect} from "react-redux";
import EndQuizResultItem from "./EndQuizResultItem";
import '../css/EndQuiz.css'

class QuizEnd extends React.Component {
    render() {
        return (
            <div className="App">
                <h1 className="App-title">The quiz has ended!</h1>
                <div id="results">
                {
                    this.props.endResults.map((x, i) => {
                        return <EndQuizResultItem name={x.name} totalRP={x.totalRP} place={x.place}/>
                    })
                }
                </div>
            </div>
        )
    }
}

export default connect(store => {
    return {
        endResults: store.quizEnd.endResults
    }
})(QuizEnd);