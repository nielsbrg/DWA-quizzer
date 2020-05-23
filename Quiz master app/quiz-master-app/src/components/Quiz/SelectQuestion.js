import React from 'react'
import { connect } from 'react-redux'
import {changeAppTitle, clearErrors} from "../../actions/App/generalAppActions";
import {
    fetchQuestionsFailed, fetchQuestionsForCategories,
    storeSuggestedQuestions
} from "../../actions/Quiz/roundActions";
import {Error, Loading} from "../Messages/messages";
import QuestionSelector from './QuestionSelector'
import { Col, Button } from 'react-bootstrap'
import '../../css/SelectQuestion.css'
import {startQuestionNothingSelected, submitQuestionToQuiz} from "../../actions/Quiz/questionSelectorEvents";

class SelectQuestion extends React.Component {
    componentWillMount() {
        if(this.props.questionNumber !== 0) {
            this.props.dispatch(changeAppTitle("Select a question"));
            this.props.dispatch(fetchQuestionsForCategories(this.props.chosenCategories, this.props.quizId, this.props.MAX_QUESTION_SUGGESTIONS_PER_CATEGORY))
                .then(res => {
                    let questionsGroupedByCategory = res.value.map(x => {
                        return {
                            category: x.body[0].category,
                            questions: x.body.map(y => {
                                return {
                                    _id: y._id,
                                    question: y.question,
                                    answer: y.answer
                                }
                            })
                        }
                    });
                    this.props.dispatch(storeSuggestedQuestions(questionsGroupedByCategory));
                })
                .catch(err => this.props.dispatch(fetchQuestionsFailed(err)));
        }
        else {
            this.props.history.push("/");
        }
    }
    onStartQuestion() {
        this.props.dispatch(clearErrors());
        if(this.props.selectedQuestion.hasOwnProperty("_id")) {
            this.props.dispatch(submitQuestionToQuiz(this.props.quizId, this.props.currentRoundNr, this.props.selectedQuestion))
                .then(res => {
                    this.props.ws.send(JSON.stringify({
                        messageType: "START_QUESTION_NOTIFY",
                        question: this.props.selectedQuestion
                    }));
                    this.props.history.push("/waiting");
                })
                .catch(err => console.log(err));
        }
        else {
            this.props.dispatch(startQuestionNothingSelected());
        }
    }
    render() {
        const { isLoading} = this.props;
        if(isLoading) {
            return (
                <div className="App">
                    <h1 className="App-title">{this.props.title}</h1>
                    <Loading text={"Loading questions for each category..."} condition={this.props.isLoading}/>
                </div>
            )
        }
        else {
            return (
                <div className="App">
                    <h1 className="App-title">{this.props.title}</h1>
                    <div id="messageList">
                        {
                            this.props.validationErrors.map((x, i) => <Error key={i} text={x} condition={true}/>)
                        }
                    </div>
                    <Col lg={10} lgOffset={1} md={10} mdOffset={1} sm={10} smOffset={1} xs={10} xsOffset={1}>
                        <QuestionSelector/>
                    </Col>
                    <Button onClick={this.onStartQuestion.bind(this)} className={`button startQuestionButton`}>Start question</Button>
                </div>
            )
        }
    }
}

export default connect((store) => {
    return {
        title: store.appTitle,
        validationErrors: store.selectQuestion.validationErrors,
        questionNumber: store.questionNumber,
        isLoading: store.selectQuestion.isLoading,
        chosenCategories: store.startRound.clickedCategories,
        selectedQuestion: store.selectQuestion.selectedQuestion,
        currentRoundNr: store.roundNumber,
        quizId: store.quiz._id,
        ws: store.ws.conn,
        MAX_QUESTION_SUGGESTIONS_PER_CATEGORY: store.quizSettings.MAX_QUESTION_SUGGESTIONS_PER_CATEGORY
}
})(SelectQuestion);