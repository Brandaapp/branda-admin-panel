import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class daypicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
  getDate() {
    return this.state.selectedDay
      ? this.state.selectedDay.toLocaleDateString()
      : "";
  }
}
