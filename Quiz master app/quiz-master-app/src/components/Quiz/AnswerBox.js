import React from 'react'
import {connect} from "react-redux";
import { Col, Button } from 'react-bootstrap'
import {approveAnswer, disapproveAnswer} from "../../actions/Quiz/answerActions";

class AnswerBox extends React.Component {
    componentDidMount() {
        if(this.props.answer === "Did not answer") {
            this.onDisapprove(true);
        }
        else if(this.props.answer === this.props.rightAnswer) {
            this.onApprove(true);
        }
    }
    onDisapprove(isEmpty) {
        if(this.props.isApproved !== undefined) {
            if(this.props.isApproved) {
                this.props.dispatch(disapproveAnswer(this.props.teamName, this.props.currentRoundNumber, true));
                this.props.ws.send(JSON.stringify({
                    messageType: "DISAPPROVE_ANSWER",
                    teamName: this.props.teamName,
                    approved: false,
                    subtract: true
                }));
            }
        }
        else if(isEmpty) {
            this.props.dispatch(disapproveAnswer(this.props.teamName, this.props.currentRoundNumber, false));
            this.props.ws.send(JSON.stringify({
                messageType: "DISAPPROVE_ANSWER",
                teamName: this.props.teamName,
                approved: false,
                subtract: false
            }));
        }
    }
    onApprove(isRightAnswer) {
        if(this.props.isApproved !== undefined) {
            if(!this.props.isApproved) {
                this.props.dispatch(approveAnswer(this.props.teamName, this.props.currentRoundNumber));
                this.props.ws.send(JSON.stringify({
                    messageType: "APPROVE_ANSWER",
                    teamName: this.props.teamName,
                    approved: true,
                }));
            }
        }
        else if(isRightAnswer) {
            this.props.dispatch(approveAnswer(this.props.teamName, this.props.currentRoundNumber));
            this.props.ws.send(JSON.stringify({
                messageType: "APPROVE_ANSWER",
                teamName: this.props.teamName,
                approved: true,
            }));
        }
    }
    render() {
        return (
            <Col lg={4} md={4} sm={4} xs={6} className="answerBox">
                <div className={`answerBoxContent ${(this.props.isApproved !== undefined) ? this.props.isApproved ? 'approved' : 'disapproved' : ""}`}>
                    <div className="teamNameAnswerBox">
                        <p>{this.props.teamName}</p>
                    </div>
                    <p className="answerText">{this.props.answer}</p>
                    <div className={`answerBoxButtons`}>
                        <Button className={`button`} onClick={this.onDisapprove.bind(this)}>Disapprove</Button>
                        <Button className={`button`} onClick={this.onApprove.bind(this)}>Approve</Button>
                    </div>
                </div>
            </Col>
        )
    }
}

export default connect(store => {
    return {
        ws: store.ws.conn,
        currentRoundNumber: store.roundNumber,
        teams: store.teams.teams
    }
})(AnswerBox)