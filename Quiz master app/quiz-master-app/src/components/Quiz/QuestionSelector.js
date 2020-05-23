import React from 'react'
import { Col, Button, Row } from 'react-bootstrap'
import  QuestionBox from './QuestionBox'
import { goForward, goBackward, endReached, beginningReached } from '../../actions/Quiz/questionSelectorEvents'
import {connect} from "react-redux";
import {clearErrors} from "../../actions/App/generalAppActions";

class QuestionSelector extends React.Component {
    goBack() {
        this.props.dispatch(clearErrors());
        if(this.props.idx - 1 < 0) {
            this.props.dispatch(beginningReached());
        }
        else {
            this.props.dispatch(goBackward());
        }
    }
    goForward() {
        this.props.dispatch(clearErrors());
        if(this.props.idx + 1 > this.props.questionsPerCategory.length - 1) {
            this.props.dispatch(endReached());
        }
        else {
            this.props.dispatch(goForward());
        }
    }
    render() {
        const {idx, selectedQuestion } = this.props;
        if(this.props.questionsPerCategory) {
            let currentCategory = this.props.questionsPerCategory[idx].category;
            return (
                <div className="questionSelector">
                    <Row className="questionSelectHeader">
                        <Col lg={2} md={2} sm={2} xs={2}>
                            <Button onClick={this.goBack.bind(this)} className={`button selectQuestionHeaderButton`}>Previous</Button>
                        </Col>
                        <Col lg={8} md={8} sm={8} xs={8}>
                            <h1 id="currentCategory">{currentCategory}</h1>
                        </Col>
                        <Col lg={2} md={2} sm={2} xs={2}>
                            <Button onClick={this.goForward.bind(this)} className={`button selectQuestionHeaderButton`}>Next</Button>
                        </Col>
                    </Row>
                    <div className={`questionList`}>
                        {
                            this.props.questionsPerCategory[idx].questions.map((x, i) => <QuestionBox
                                answer={x.answer}
                                category={currentCategory}
                                questionId={x._id}
                                key={i}
                                questionText={x.question}
                                isSelected={x._id === selectedQuestion._id}
                            />)
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default connect((store) => {
    return {
        questionsPerCategory: store.selectQuestion.questionsPerCategory,
        idx: store.selectQuestion.currentCategoryIndex,
        selectedQuestion: store.selectQuestion.selectedQuestion
    }
})(QuestionSelector)