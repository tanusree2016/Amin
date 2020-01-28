import React from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import Modals from './NewProject'
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export class DatePickrEnd extends React.Component {
  state = {
    end_date: new Date(),
  };

  handleChange = date => {
    this.setState({
      end_date: date
    });
  };

  render() {
    return (
      <DatePicker
        selected={this.state.end_date}
        onChange={this.handleChange}
      />
    );
  }
}

export class TimePickrEnd extends React.Component {
  state = {
    end_time: '10:00',
  }

  onChangeTime = time => {
    this.setState({
      end_time: time
    });
  };

  render() {
    return (
      <div>
        <TimePicker
          onChange={this.onChangeTime}
          value={this.state.end_time}
        />
      </div>
    );
  }
}

export default class DateRangeEnd extends React.Component {
  render() {
    return (
      <div>
        <DatePickrEnd />
        <TimePickrEnd />

      </div>
    )
  }
}