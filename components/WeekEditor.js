import { useState, useEffect } from "react";
import DayEditor from "./DayEditor";
import { Button } from "@material-ui/core";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function WeekEditor(props) {
  const [state, setState] = useState({
    schedule: [],
    startTimes: [],
    endTimes: [],
    ver: -1,
  });

  function updateOnChange(date, hour, day, start) {
    hour = hour.toLowerCase();
    let newDate = getProperDate(hour);
    let tempSched = undefined;
    if (start) {
      tempSched = state.startTimes;
      tempSched[day] = newDate;
      setState({
        startTimes: tempSched,
        endTimes: state.endTimes,
        schedule: state.schedule,
        ver: state.ver,
      });
    } else {
      tempSched = state.endTimes;
      tempSched[day] = newDate;
      setState({
        startTimes: state.startTimes,
        endTimes: tempSched,
        schedule: state.schedule,
        ver: state.ver,
      });
    }
  }

  function reset() {
    Materialize.toast(
      "Updates for " + state.schedule.name + " cleared",
      2500,
      "red"
    );
    update(true); // want to manually override
  }

  useEffect(() => {
    update(false);
  });

  function updateSchedule() {}

  // override allows for setState not based on version number - used from reset()
  const update = (override) => {
    let tempSched = props.schedule;
    let tempStart = [];
    let tempEnd = [];

    for (var item in props.schedule) {
      if (item !== "name") {
        let tempTime = tempSched[item].split("-");
        tempStart[item] = getProperDate(tempTime[0]);
        tempEnd[item] = getProperDate(tempTime[1]);
      }
    }

    if (override || state.ver !== props.updateNum) {
      setState({
        startTimes: tempStart,
        endTimes: tempEnd,
        schedule: tempSched,
        ver: props.updateNum,
      });
    }
  };

  function getProperDate(time) {
    let am = time.indexOf("am") > -1;
    const date = new Date();

    let strippedTime = undefined;

    if (am) {
      strippedTime = time.substring(0, time.indexOf("am")).trim();
    } else {
      strippedTime = time.substring(0, time.indexOf("pm")).trim();
    }

    let partition = strippedTime.split(":");
    let hour = partition[0];
    let minute = partition[1] === undefined ? "00" : partition[1];

    if (am) {
      if (hour === "12") {
        hour = "0";
      }
    } else {
      if (hour !== "12") {
        let n = parseInt(hour) + 12;
        hour = n.toString();
      }
    }

    date.setHours(hour);
    date.setMinutes(minute);

    return date;
  }

  return (
    <tr
      className="schedule-row"
      key={"_" + Math.random().toString(36).substr(2, 9)}
    >
      <td>{state.schedule.name}</td>

      {days.map((day) => {
        return (
          <DayEditor
            day={day}
            start={state.startTimes[day]}
            end={state.endTimes[day]}
            callback={updateOnChange}
          />
        );
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "150px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={updateSchedule.bind(this)}
        >
          Update
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: "#e23a31", color: "white" }}
          onClick={reset.bind(this)}
        >
          Clear Edits
        </Button>
      </div>
    </tr>
  );
}
