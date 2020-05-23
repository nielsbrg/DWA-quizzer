import React from 'react'
import {connect} from "react-redux";
import {Col} from "react-bootstrap";
import AnswerBox from "./AnswerBox";

class TeamAnswerInformation extends React.Component {
    render() {
        const { currentCategory, currentQuestion, teamAnswers, teams } = this.props.quiz;
        const showTeamBoxes = currentCategory.length > 0 && currentQuestion.length > 0;
        let answerBoxes = (<div></div>);
        if(showTeamBoxes) {
            if(teamAnswers.length > 0) {
                answerBoxes = teamAnswers.map((x, i) => {
                    return <AnswerBox key={i} teamName={x.teamName} answer={x.answer} isApproved={x.approved}/>
                })
            }
            else if(teams.length > 0) {
                console.log("TEAMS.LENGTH > 0");
                //show submitted / not submitted
                answerBoxes = teams.map((x, i) => {
                    return <AnswerBox key={i} teamName={x.teamName} hasAnswered={x.hasAnswered}/>
                })
            }
            return answerBoxes;
        }
        return (
            <Col lg={12} md={12} sm={12} xs={12} id="teamAnswers">
                {
                    this.props.quiz.teamAnswers.map((x,i) => {
                        return <AnswerBox key={i} teamName={x.teamName} isApproved={x.approved} answer={x.answer} />
                    })
                }
            </Col>
        )
    }
}

export default connect(store => {
    return {
        quiz: store.quiz
    }
})(TeamAnswerInformation)