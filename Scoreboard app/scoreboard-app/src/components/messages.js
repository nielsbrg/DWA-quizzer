import React , { Component } from 'react'
import '../css/App.css'

export class Loading extends Component {
    render() {
        return (
            <div className={this.props.condition ? "active loading" : "inactive loading"}>
                {this.props.text}
            </div>
        )
    }
}

export class Success extends Component {
    render() {
        let classNames = "success";
        this.props.condition ? classNames += " active" : classNames += " inactive";
        if(this.props.extraClassNames) classNames += " " + this.props.extraClassNames;
        return (
            <div className={classNames}>
                {this.props.text}
            </div>
        )
    }
}

export class Error extends Component {
    render() {
        return (
            <div className={this.props.condition ? "active error" : "inactive error"}>
                {this.props.text}
            </div>
        )
    }
}