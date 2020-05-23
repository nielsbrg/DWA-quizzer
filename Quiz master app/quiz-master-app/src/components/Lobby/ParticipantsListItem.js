import React from 'react'
import '../../css/ParticipantListItem.css'
import { Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

class ParticipantsListItem extends React.Component {
    onKickParticipant() {
        this.props.ws.conn.send(JSON.stringify({
            messageType: "KICK_USER",
            name: this.props.participant.name
        }));
    }
    generateNonEmptyRow() {
        const {name, isReady} = this.props.participant;
        console.log(isReady);
        return (
            <div className="ParticipantItem">
                <Row className="content">
                    <Col lg={2} md={2} sm={1} xs={2}>
                        <svg className="connectionStatus" width="20" height="25">
                            <circle cx="10" cy="15" r="7.5" stroke="black" strokeWidth="1.5" fill={isReady ? "green" : "red"}/>
                        </svg>
                    </Col>
                    <Col lg={6} md={6} sm={8} xs={6}>
                        <p className="participantName">{name}</p>
                    </Col>
                    <Col className="regularCol" lg={4} md={3} sm={2} xs={3}>
                        <Button onClick={this.onKickParticipant.bind(this)} className="button kickUserButton">Kick</Button>
                    </Col>
                </Row>
            </div>
        )
    }
    generateEmptyRow() {
        return (
            <div className="ParticipantItem">
                <Row className="content">
                    <Col md={12} sm={12} xs={12}>
                        {
                            this.props.searchTerm.length > 0
                            ? <p className="participantName">No results found for {this.props.searchTerm}.</p>
                            : <p className="participantName">You have not accepted anyone into your quiz yet.</p>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
    render() {
        if(this.props.empty) {
            return this.generateEmptyRow();
        }
        else {
            return this.generateNonEmptyRow();
        }
    }
}

export default connect((store) => {
    return {
        searchTerm: store.lobby.participantsSearchTerm,
        ws: store.ws,
    }
})(ParticipantsListItem)