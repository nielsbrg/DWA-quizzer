import React from 'react'
import {Button, Row, Col } from 'react-bootstrap'
import '../../css/OptionsRow.css'
import changeSearchTerm from '../../actions/Lobby/OptionsRow/changeSearchTerm'
import { connect } from 'react-redux'
import {notifyKickAllParticipants} from '../../actions/Lobby/participantActions'

class OptionsRow extends React.Component {
    onRefuseAll() {
        if(this.props.list.length > 0) {
            this.props.ws.send(JSON.stringify({
                messageType: "REFUSE_ALL_APPLICANTS",
            }));
        }
    }
    onAcceptAll() {
        if(this.props.list.length > 0) {
            this.props.ws.send(JSON.stringify({
                messageType: "ACCEPT_ALL_APPLICANTS",
                applicants: this.props.list
            }));
        }
    }
    generateApplicantButtons() {
        return (
            <div id="ProcessAllButtons">
                <Button id="leftButton" onClick={this.onRefuseAll.bind(this)} className="button">Refuse all</Button>
                <Button onClick={this.onAcceptAll.bind(this)} className="button">Accept all</Button>
            </div>
        )
    }
    generateParticipantButtons() {
        return <Button
            onClick={() => {
                if(this.props.list.length > 0) {
                    this.props.dispatch(notifyKickAllParticipants())
                }
            }}
            className="button kickAllButton">Kick all</Button>;
    }
    onChangeSearchTerm(event) {
        this.props.dispatch(changeSearchTerm(this.props.isParticipants, event.target.value))
    }
    render() {
        return (
            <div className="optionsRow">
                <Row id="searchBar">
                    <Col md={6} sm={6} xs={12}>
                        <div className="searchInput form-group has-feedback">
                            <input
                                onChange={this.onChangeSearchTerm.bind(this)}
                                className="searchField form-control"
                                type="text"
                                placeholder="Search.."/>
                            <i className="glyphicon glyphicon-search form-control-feedback searchIcon"/>
                        </div>
                    </Col>
                    <Col lg={2} md={1} smHidden xsHidden/>
                    <Col className="regularCol" lg={4} md={6} sm={6} xs={12}>
                        {
                            this.props.isParticipants ? this.generateParticipantButtons() : this.generateApplicantButtons()
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect((store) => {return {
    ws: store.ws.conn
} })(OptionsRow);