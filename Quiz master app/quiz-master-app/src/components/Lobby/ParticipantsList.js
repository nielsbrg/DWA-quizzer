import React from 'react'
import ParticipantsListItem from './ParticipantsListItem'
import OptionsRow from './OptionsRow'

export default class ParticipantsList extends React.Component {
    generateList() {
        const { participants, searchTerm } = this.props;
        const listItems = participants
            .filter(x => x.name.indexOf(searchTerm) !== -1)
            .map((x, i) => {
                return <ParticipantsListItem key={i} participant={x} empty={false} />
            });
        if(listItems.length === 0) {
            return <ParticipantsListItem empty={true}/>
        }
        return listItems;
    }
    render() {
        return (
            <div id="ParticipantsList">
                <h1 className="title">Participants</h1>
                <div id="list">
                    <OptionsRow list={this.props.participants} isParticipants={true}/>
                    {
                        this.generateList()
                    }
                </div>
            </div>
        )
    }
}