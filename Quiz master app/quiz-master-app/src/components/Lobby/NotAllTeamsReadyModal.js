import React, {Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import {cancelNotReadyModal, startQuizNotAllReady} from "../../actions/Lobby/startQuizActions";

class NotAllTeamsReadyModal extends Component {
    componentDidMount() {
        if(this.props.teams.filter(x => !x.isReady).length === 0) {
            this.props.dispatch(cancelNotReadyModal());
        }
    }
    onCancel() {
        this.props.dispatch(cancelNotReadyModal())
    }
    onStart() {
        this.props.dispatch(cancelNotReadyModal());
        this.props.dispatch(startQuizNotAllReady());
    }
    render() {
        let notReadyTeams = this.props.teams.filter(x => !x.isReady);
        return (
            <Modal show={this.props.show && notReadyTeams.length > 0}>
                <Modal.Header>
                    <Modal.Title>
                        Start quiz
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The following teams are not ready:
                    <ul>
                        {
                            notReadyTeams.map((x,i) => <li key={i}>{x.name}</li>)
                        }
                    </ul>
                    Start quiz anyway?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onCancel.bind(this)} className="button">Cancel</Button>
                    <Button onClick={this.onStart.bind(this)} className="button">Start</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect((store) => {
    return {
        show: store.lobby.showNotReadyModal,
        teams: store.lobby.teams
    }
})(NotAllTeamsReadyModal)