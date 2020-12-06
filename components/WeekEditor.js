import { useState, useEffect } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function WeekEditor(props) {
  const [state, setState] = useState({
    schedule: props.schedule,
    startTimes: [],
    endTimes: [],
  });

  useEffect(() => {
    let tempSched = state.schedule;
    let tempStart = [];
    let tempEnd = [];
    for (var item in state.schedule) {
      if (item !== "name") {
        let tempTime = tempSched[item].split("-");
        tempStart[item] = new Date(tempTime[0]);
        tempEnd[item] = new Date(tempTime[0]);
      }
    }
    setState({
      startTimes: tempStart,
      endTimes: tempEnd,
      schedule: tempSched,
    });
  });

  return (
    <tr
      className="schedule-row"
      key={"_" + Math.random().toString(36).substr(2, 9)}
    >
      <td>{state.schedule.name}</td>
      <KeyboardTimePicker
        label="Start"
        // value={state.startTimes.monday}
        KeyboardButtonProps={{
          "aria-label": "change time",
        }}
      />
      <KeyboardTimePicker
        label="End"
        value={new Date(state.endTimes.monday)}
        KeyboardButtonProps={{
          "aria-label": "change time",
        }}
      />
      <td>
        {state.schedule.monday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.monday}
      </td>
      <td>
        {state.schedule.tuesday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.tuesday}
      </td>
      <td>
        {state.schedule.wednesday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.wednesday}
      </td>
      <td>
        {state.schedule.thursday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.thursday}
      </td>
      <td>
        {state.schedule.friday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.friday}
      </td>
      <td>
        {state.schedule.saturday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.saturday}
      </td>
      <td>
        {state.schedule.sunday === "11:00am-11:01am"
          ? "Closed"
          : state.schedule.sunday}
      </td>
    </tr>
  );
}
