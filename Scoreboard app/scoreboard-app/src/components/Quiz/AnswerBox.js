import React from 'react'
import {connect} from "react-redux";
import { Col } from 'react-bootstrap'

class AnswerBox extends React.Component {
    render() {
        const { teamName, answer, hasAnswered, isApproved } = this.props;
        if(hasAnswered !== undefined) {
            return (
                <Col lg={2} md={3} sm={3} xs={6} className="answerBox">
                    <div className={`answerBoxContent ${hasAnswered ? `answered` : `waiting`}`}>
                        <div className="teamNameAnswerBox">
                            <p>{teamName}</p>
                        </div>
                        <p className="answerText">{hasAnswered ? `Submitted` : `Waiting for answer`}</p>
                    </div>
                </Col>
            )
        }
        else {
            // if(this.props.answer === "Did not answer") {
            //     return (<div className="inactive"/>)
            // }
            return (
                <Col lg={2} md={3} sm={3} xs={6} className="answerBox">
                    <div className={`answerBoxContent ${isApproved !== undefined ? isApproved === true ? 'approved' : 'disapproved' : 'unapproved'}`}>
                        <div className="teamNameAnswerBox">
                            <p>{teamName}</p>
                        </div>
                        <p className="answerText">{answer}</p>
                    </div>
                </Col>
            )
        }
    }
}

export default connect(store => {
    return {

    }
})(AnswerBox)