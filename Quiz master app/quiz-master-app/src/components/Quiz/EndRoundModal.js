import React, {Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import {endQuiz, setQuestionNr, setRoundNumber, showEndRoundModal} from "../../actions/Quiz/roundActions";
import {deleteAllQuizData, setQuizToInactive} from "../../actions/Quiz/endQuizActions";

class EndRoundModal extends Component {
    onNewRound() {
        this.props.dispatch(endQuiz(false));
        this.props.dispatch(setRoundNumber(this.props.currentRoundNumber + 1));
        this.props.dispatch(setQuestionNr(0));
        this.props.dispatch(showEndRoundModal(false));
        this.props.ws.send(JSON.stringify({messageType: "START_ROUND_NOTIFY"}));
        this.props.history.push("/quiz/startRound");
    }
    onEndQuiz() {
        this.props.ws.send(JSON.stringify({messageType: "SEND_ROUND_RESULTS", finalTeams: this.props.finalTeams}));
        this.props.dispatch(endQuiz(true));
    }
    onSaveQuiz() {
        this.goBackToStart(this.props.dispatch(setQuizToInactive(this.props.quizId)));
    }
    onEndQuizNoSave() {
        this.goBackToStart(this.props.dispatch(deleteAllQuizData(this.props.quizId)));
    }
    goBackToStart(choice) {
        choice.then(res => {
            this.props.ws.send(JSON.stringify({messageType: "QUIZ_MASTER_ENDED_QUIZ"}));
            this.props.dispatch(showEndRoundModal(false));
            this.props.history.push("/");
        }).catch(err => {
            throw err;
        })
    }
    render() {
        if(this.props.hasEndedQuiz) {
            return (
                <Modal show={true}>
                    <Modal.Header>
                        <Modal.Title>
                            Save quiz data?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Should the quiz results be saved?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onEndQuizNoSave.bind(this)} className="button">No</Button>
                        <Button onClick={this.onSaveQuiz.bind(this)} className="button">Yes</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
        else {
            return (
                <Modal show={this.props.show}>
                    <Modal.Header>
                        <Modal.Title>
                            New round or end quiz?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you have the strength to go on for another round? Or shall we <strong>end the quiz?</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onEndQuiz.bind(this)} className="button">End the quiz</Button>
                        <Button onClick={this.onNewRound.bind(this)} className="button">I am up for another round</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}

export default connect(store => {
    return {
        show: store.answers.showEndRoundModal,
        currentRoundNumber: store.roundNumber,
        ws: store.ws.conn,
        hasEndedQuiz: store.endQuiz.hasEndedQuiz,
        quizId: store.quiz._id,
        finalTeams: store.teams.teams
    }
})(EndRoundModal)