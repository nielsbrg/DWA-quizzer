import React from 'react'
import {connect} from "react-redux";
import { Col, Row} from 'react-bootstrap'

class QuestionInformation extends React.Component {
    render() {
        const {currentRoundNumber, currentQuestionNumber, roundsPlayed, currentCategory, currentQuestion } = this.props.quiz;
        const showQuestion = currentCategory.length > 0 && currentQuestion.length > 0;
        if(!this.props.quiz.isActive) {
            return (
                <div></div>
            )
        }
        return (
            <div id="questionInformation">
                <Row className={`text-padding text-left`}>
                    <Col lg={8} md={8} sm={8} xs={8}>
                        <p className="text">Question {currentQuestionNumber} of Round {currentRoundNumber}</p>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                        <p className="text">Rounds played: {roundsPlayed-1}</p>
                    </Col>
                </Row>
                <Row className={`text-padding text-left ${showQuestion ? "active" : "inactive"}`}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <p className="text categoryText">Category: {currentCategory}</p>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <p className="text questionText">{currentQuestion}</p>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(store => {
    return {
        quiz: store.quiz
    }
})(QuestionInformation);