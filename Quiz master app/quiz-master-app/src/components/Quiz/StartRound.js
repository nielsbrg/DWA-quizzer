import React from 'react'
import { connect } from 'react-redux'
import {changeAppTitle, clearErrors} from "../../actions/App/generalAppActions";
import {
    fetchCategories, startRoundRequest, setQuestionNr, storeCategories,
    submitLessThanThreeCategories
} from "../../actions/Quiz/roundActions";
import {Error, Loading} from "../Messages/messages";
import { Col, Button } from 'react-bootstrap'
import '../../css/StartRound.css'
import CategoryBox from './CategoryBox'

class StartRound extends React.Component {
    componentWillMount() {
        if(this.props.currentRoundNr !== 0) {
            this.props.dispatch(changeAppTitle(`Round ${this.props.currentRoundNr}`));
            this.props.dispatch(startRoundRequest(this.props.quiz._id, this.props.currentRoundNr))
                .then(res => {
                    this.props.ws.send(JSON.stringify({messageType: "START_ROUND_FULFILLED", roundNumber: res.value.body.roundNumber, teams: this.props.finalTeams}));
                    return this.props.dispatch(fetchCategories());
                })
                .then(res => {
                    this.props.dispatch(storeCategories(res.value.body));
                })
                .catch(err => console.log(err));
        }
        else {
            this.props.history.push("/");
        }
    }
    onStartRound() {
        this.props.dispatch(clearErrors());
        if(this.props.clickedCategories.size < this.props.MAX_CATEGORIES_PER_ROUND) {
            this.props.dispatch(submitLessThanThreeCategories(this.props.clickedCategories.size, this.props.MAX_CATEGORIES_PER_ROUND))
        }
        else {
            this.props.ws.send(JSON.stringify({messageType: "START_ROUND_SELECT_QUESTION"}));
            this.props.dispatch(setQuestionNr(1));
            this.props.history.push(`/quiz/selectQuestion`);
        }
    }
    render() {
        const { isLoading } = this.props;
        return (
            <div className="App">
                <h1 className="App-title">{this.props.title}</h1>
                <h1 id="categorySelectText">{`Select ${this.props.MAX_CATEGORIES_PER_ROUND} categories for this round`}</h1>
                <h1 id="selectedCategories">{this.props.clickedCategories.length === 0 ? "Nothing" : [...this.props.clickedCategories].join(", ")}</h1>
                <div id="validationErrorsStartRound">
                    {
                        this.props.validationErrors.map((x, i) => <Error key={i} text={x} condition={true}/>)
                    }
                </div>
                <Loading text="Loading categories" condition={isLoading}/>
                <Col lg={1} md={1} sm={1} xs={1}/>
                <Col id="categoryBoxList" md={11} xs={11} lg={11} sm={11} >
                {
                    this.props.categories.map((x,i) => <CategoryBox MAX_CATEGORIES_PER_ROUND={this.props.MAX_CATEGORIES_PER_ROUND} key={i} categoryName={x}/>)
                }
                </Col>
                <Col lg={12} md={12} sm={12} xs={12} id="startRoundButtonDiv">
                    <Button onClick={this.onStartRound.bind(this)} id="startRoundButton" className="button">Start Round</Button>
                </Col>

            </div>
        )
    }
}

export default connect((store) => {
    return {
        currentRoundNr: store.roundNumber,
        title: store.appTitle,
        ws: store.ws.conn,
        quiz: store.quiz,
        isLoading: store.startRound.isLoading,
        categories: store.categories,
        validationErrors: store.startRound.validationErrors,
        clickedCategories: store.startRound.clickedCategories,
        MAX_CATEGORIES_PER_ROUND: store.quizSettings.MAX_CATEGORIES_PER_ROUND,
        finalTeams: store.teams.teams
    }
})(StartRound)