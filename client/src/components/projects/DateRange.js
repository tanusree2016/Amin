import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import Modals from './NewProject'
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export class DatePickr extends React.Component {
  state = {
    start_date: new Date(),
  };

  handleChange = date => {
    this.setState({
      start_date: date
    });
  };

  render() {
    return (
      <DatePicker
        selected={this.state.start_date}
        onChange={this.handleChange}
      />
    );
  }
}

export class TimePickr extends React.Component {
  state = {
    time: '10:00',
  }

  onChange = time => this.setState({ time })

  render() {
    return (
      <div>
        <TimePicker
          onChange={this.onChange}
          value={this.state.time}
        />
      </div>
    );
  }
}

export default class DateRange extends React.Component {
  render() {
    return (
      <div>
        <DatePickr />
        <TimePickr />

      </div>
    )
  }
}