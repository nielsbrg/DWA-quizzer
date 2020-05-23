import React from 'react'
import { connect } from 'react-redux'
import {addThisCategory, deleteThisCategory } from "../../actions/Quiz/roundActions";
import {clearErrors} from "../../actions/App/generalAppActions";
import { Col } from 'react-bootstrap'

class CategoryBox extends React.Component {
    onClick() {
        this.props.dispatch(clearErrors());
        if(this.props.clickedCategories.has(this.props.categoryName)) {
            this.props.dispatch(deleteThisCategory(this.props.categoryName));
        }
        else {
            this.props.dispatch(addThisCategory(this.props.categoryName, this.props.MAX_CATEGORIES_PER_ROUND));
        }
    }
    render() {
        let isSelected = this.props.clickedCategories.has(this.props.categoryName);
       return (
           <Col onClick={this.onClick.bind(this)} className={`categoryBox ${isSelected ? "selected" : ""}`}
            lg={2} md={2} sm={2} xs={2}>
               <p className="categoryBoxText">{this.props.categoryName}</p>
           </Col>
       )
    }
}

export default connect((store) => {
    return {
        clickedCategories: store.startRound.clickedCategories,
    }
})(CategoryBox);