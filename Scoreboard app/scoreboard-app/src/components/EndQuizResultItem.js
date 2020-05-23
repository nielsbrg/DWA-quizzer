import React from 'react'
import {Col} from "react-bootstrap";

export default class EndQuizResultItem extends React.Component {
    generateNormalView(color, prefix) {
        return (
            <Col className={`endQuizItemBox ${color}`} lg={8} lgOffset={2} sm={8} smOffset={2} md={8} mdOffset={2} xs={8} xsOffset={2}>
                <p>{this.props.place + prefix}</p>
                <p>{this.props.name}</p>
                <p>Total Round Points: {this.props.totalRP}</p>
            </Col>
        )
    }
    generateOtherView(color, prefix) {
        return (
            <Col className={`endQuizItemBox ${color}`} lg={3} sm={3} md={3} xs={4}>
                <p>{this.props.place + prefix}</p>
                <p>{this.props.name}</p>
                <p>RP: {this.props.totalRP}</p>
            </Col>
        )
    }
    render() {
        const {place} = this.props;
        let color;
        let prefix = "";
        if(place === 1) {
            color = "first";
            prefix = "st";
        }
        else if(place === 2) {
            color = "second";
            prefix = "nd";
        }
        else if(place === 3) {
            color = "third";
            prefix = "rd";
        }
        else {
            color = "other";
            prefix = "th";
        }

        return this.props.place < 4 ? this.generateNormalView(color, prefix) : this.generateOtherView(color, prefix)
    }
}