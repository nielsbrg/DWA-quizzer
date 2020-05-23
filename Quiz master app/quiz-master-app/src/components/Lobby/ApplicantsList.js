import React from 'react'
import OptionsRow from './OptionsRow'
import {Col } from 'react-bootstrap'
import ApplicantRow from './ApplicantListItem'

export default class ApplicantsList extends React.Component {
    generateList() {
        const { searchTerm , applicants } = this.props;
        if(searchTerm.length > 0) {
            const listItems = applicants.filter(x => x.indexOf(searchTerm) !== -1)
                .map((x, i) => <ApplicantRow key={i} applicantName={x} empty={false}/>);
            if(listItems.length === 0) {
                return <ApplicantRow empty={true}/>
            }
            return listItems;
        }
        else if(applicants.length === 0) {
            return <ApplicantRow empty={true}/>
        }
        else {
            return applicants.map((x, i) => {
                return <ApplicantRow key={i} applicantName={x} empty={false}/>;
            })
        }
    }
    render() {
        return (
            <div id="ListPanel">
                <div id="logo">
                    <h1 className="title">Applicants</h1>
                </div>
                <div id="ListMainContent">
                    <Col className="regularCol" id="ListOptionsPanel" xs={12} sm={12} md={10} lg={10}>
                        <OptionsRow list={this.props.applicants} isParticipants={false}/>
                        {
                            this.generateList()
                        }
                    </Col>
                </div>
            </div>
        )
    }
}