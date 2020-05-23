import React from 'react'
import {connect} from "react-redux";
import {selectQuestion} from '../../actions/Quiz/questionSelectorEvents'

class QuestionBox extends React.Component {
    onClick() {
        this.props.dispatch(selectQuestion(
            {
                _id: this.props.questionId,
                question: this.props.questionText,
                answer: this.props.answer,
                category: this.props.category
            }));
    }
    render() {
        return (
            <div onClick={this.onClick.bind(this)} className={`questionBox ${this.props.isSelected ? "selected" : ""}`}>
                <p className="questionBoxText">{this.props.questionText}</p>
            </div>
        )
    }
}

export default connect(store => {
    return {}
})(QuestionBox)