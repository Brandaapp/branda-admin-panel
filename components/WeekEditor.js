import { useState, useEffect } from "react";
import DayEditor from "./DayEditor";
import { Button } from "@material-ui/core";

const axios = require("axios");

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
    let tempStart = state.startTimes;
    let tempEnd = state.endTimes;
    if (start) {
      tempStart[day] = newDate;
    } else {
      tempEnd[day] = newDate;
    }

    setState((prev) => ({ ...prev, startTimes: tempStart, endTimes: tempEnd }));
  }

  function reset() {
    Materialize.toast(
      "Updates for " + state.schedule.name + " cleared",
      2500,
      "#0d47a1 blue darken-4 rounded"
    );
    update(true); // want to manually override
  }

  useEffect(() => {
    update(false);
  });

  async function updateSchedule() {
    let data = mergeStartEndToSchedule();
    await axios
      .patch(`/api/schedules/${props.weekNum}/${state.schedule.emp_id}`, data)
      .then((response) => {
        props.refresh();
        Materialize.toast(
          state.schedule.name + " updated",
          2500,
          "green rounded"
        );
      })
      .catch((err) => {
        console.log(err);
        Materialize.toast(
          "Unable to update " + state.schedule.name,
          2500,
          "red rounded"
        );
      });
  }

  function mergeStartEndToSchedule() {
    let temp = {};
    temp["name"] = state.schedule.name;
    for (var day of days) {
      let start = state.startTimes[day];
      let end = state.endTimes[day];

      let format = (time) => {
        let t = new Date(time).toLocaleTimeString().toLocaleLowerCase();
        let parts = t.split(" ");
        return (
          parts[0].substring(parts[0], parts[0].lastIndexOf(":")) + parts[1]
        );
      };

      let startString = format(start);
      let endString = format(end);

      temp[day] = startString + "-" + endString;
    }
    return temp;
  }

  // override allows for setState not based on version number - used from reset()
  const update = (override) => {
    if (override || state.ver !== props.updateNum) {
      let tempSched = props.schedule;
      let tempStart = [];
      let tempEnd = [];

      for (var item in props.schedule) {
        if (item !== "name" && item !== "emp_id") {
          let tempTime = tempSched[item].split("-");
          tempStart[item] = getProperDate(tempTime[0]);
          tempEnd[item] = getProperDate(tempTime[1]);
        }
      }

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
            key={"_" + Math.random().toString(36).substr(2, 9)}
          />
        );
      })}

      <td
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "150px",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: "#4caf50", color: "white" }}
          onClick={updateSchedule.bind(this)}
        >
          Update
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: "#0d47a1", color: "white" }}
          onClick={reset.bind(this)}
        >
          Clear Edits
        </Button>
      </td>
    </tr>
  );
}
