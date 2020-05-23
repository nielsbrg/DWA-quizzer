import React from 'react'
import '../../css/ApplicantRow.css'
import { Col, Row, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class ApplicantListItem extends React.Component {
    onAccept() {
        this.props.ws.send(JSON.stringify({
            messageType: "ACCEPT_APPLICANT",
            name: this.props.applicantName
        }));
    }
    onRefuse() {
        this.props.ws.send(JSON.stringify({
            messageType: "REFUSE_APPLICANT",
            name: this.props.applicantName
        }));
    }
    generateNonEmptyRow() {
        return (
            <div className="ApplicantRow">
                <Row>
                    <Col md={8} sm={7} xs={12} className="applicantText">
                        <p>{this.props.applicantName} wants to join the quiz!</p>
                    </Col>
                    <Col md={4} sm={5} xs={12} className="applicantButtons regularCol">
                        <Button onClick={this.onRefuse.bind(this)} id="leftButton" className="button">Refuse</Button>
                        <Button onClick={this.onAccept.bind(this)} className="button">Accept</Button>
                    </Col>
                </Row>
            </div>
        )
    }
    generateEmptyRow() {
        return (
            <div className="ApplicantRow">
                <Row>
                    <Col md={12} sm={12} xs={12} className="applicantText">
                        {
                            this.props.searchTerm.length > 0
                                ? <p className="participantName">No results found for {this.props.searchTerm}.</p>
                                : <p>There are no applicants.</p>
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

export default connect((store) => { return {
    searchTerm: store.lobby.searchTerm,
    ws: store.ws.conn
}})(ApplicantListItem)