import React, {Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { cancelKickAll } from '../../actions/Lobby/participantActions'

class KickAllParticipantModal extends Component {
    onKickAllUsers() {
        this.props.ws.send(JSON.stringify({
            messageType: "KICK_ALL_USERS",
            names: this.props.participants.map(x => x.name)
        }));
    }
    onCancel() {
        this.props.dispatch(cancelKickAll())
    }
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>
                        Kick all participants
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to kick <strong>all participants</strong>? They will have to apply again.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onCancel.bind(this)} className="button">No</Button>
                    <Button onClick={this.onKickAllUsers.bind(this)} className="button">Yes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect((store) => {
    return {
        show: store.lobby.showKickAllModal,
        participants: store.lobby.teams,
        ws: store.ws.conn
    }
})(KickAllParticipantModal)