import React, { Component } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import CalendarView from './../view/calendarView/CalendarView'
import MonthsView from './../view/MonthsView'
import YearView from './../view/YearView'
import moment from 'moment'
import Utils from './../../utils/Utils'

export default class MonthCalendar extends Component {
    state =
        {
            mode: 'calendar',
            date: moment(),
        };


    setDate = (e, date) => {
        
        this.props.callback(e,date);
    }

    changeTitle = (event, year, month) => {
        if (this.state.mode === "month") {
            this.setState({ mode: "calendar" });
        } else if (this.state.mode === "year") {
            this.setState({ mode: "month" });
        }
        this.setState({ date: moment([year, month, this.state.date.get('date')]) });
    }

    changeMode = (e, year, month) => {
        if (this.state.mode === "calendar") {
            this.setState({ mode: "month" })
        } else if (this.state.mode === "month") {
            this.setState({ mode: "year" })
        }
    }

    decMonth = (event, date) => {
        if (this.state.mode === 'month') {
            date.add(-1, 'year');
        } else {
            date.add(-1, 'month');
        }
        this.setState({ date: date });
    }

    incMonth = (event, date) => {
        if (this.state.mode === 'month') {
            date.add(1, 'year');
        } else {
            date.add(1, 'month');
        }
        this.setState({ date: date });
    }

    render() {
        
        let date = moment(this.state.date, ["YYYY/MM/DD"], true);
      
        console.log(date.format("YYYY/MM/DD"))
        let displayText = Utils.Months.getMonthText(date.get('month')) + " " + date.get('year');

        if (this.state.mode === "month") {
            displayText = date.get('year')
        } else if (this.state.mode === "year") {
            displayText = "2015 - 2018"
        }

        return (
            <div>
                <Grid centered>
                    <Icon name="angle left" style={{ paddingTop: '3px', marginRight: '10px', cursor: 'pointer' }} onClick={(e) => this.decMonth(e, date)} />
                    <Button size="tiny" onClick={(e) => this.changeMode(e, date)}>
                        {displayText}
                    </Button>
                    <Icon name="angle right" style={{ paddingTop: '3px', cursor: 'pointer' }} onClick={(e) => this.incMonth(e, date)} />
                </Grid>

                {(this.state.mode === "calendar") ?
                    <CalendarView
                        date={date}
                        callback={this.setDate}
                    /> :
                    (this.state.mode === "month") ?
                        <MonthsView date={date}
                            changeTitle={this.changeTitle}
                        /> :
                        (this.state.mode === "year") ?
                            <YearView date={date} changeTitle={this.changeTitle}
                            /> :
                            null}
            </div>
        )
    }
}