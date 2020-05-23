import React from 'react'
import '../../css/TeamDataTable.css'

export default class TeamDataTable extends React.Component {
    render() {
        return (
            <div className="dataTable">
                <div className="dataTableHeading">
                    <div className="dataTableHead">
                        Name
                    </div>
                    <div className="dataTableHead">
                        Total RP
                    </div>
                    {
                        this.props.roundResults.map((x,i) => {
                            return <div key={i} className="dataTableHead">Round {x.roundNumber}</div>
                        })
                    }
                </div>
                <div className="dataTableBody">
                    <div className="dataTableRow">
                        <div className="dataTableCell teamName">
                            {this.props.teamName}
                        </div>
                        <div className="dataTableCell">
                            {this.props.totalRP}
                        </div>
                        {
                            this.props.roundResults.map((x, i) => {
                                return <div key={i} className="dataTableCell">{x.correctAnswers}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}