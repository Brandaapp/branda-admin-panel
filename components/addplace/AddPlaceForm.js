import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DayEditor from "../DayEditor";
import createTable from "../../utils/renderUtils/tableGenerator";
import { getDefaultWeekTimes, getProperDate } from "../../utils/dateUtils";

import axios from "axios";

import { useStyles } from "./styles";

const defaultTimes = getDefaultWeekTimes();

export default function AddPlaceForm(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    group: "Dining",
    times: defaultTimes,
  });

  const { onSubmit } = props;
  const options = ["Dining", "Sport", "Library"];
  const labels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const post = () => {
    const data = {
      name: state.name,
      group: state.group,
    };

    const times = state.times;
    const json = {};
    Object.keys(times).forEach((day) => {
      json[day] = times[day].start + "-" + times[day].end;
    });
    const weeks = [];
    for (let i = 0; i < 54; i++) {
      weeks.push(json);
    }

    axios.post(`api/places/add`, data).then((response) => {
      const emp_id = response.data._id;
      axios.post(`api/schedules`, { ...data, emp_id, weeks, ...json }).then((response) => {
        onSubmit();
      });
    });
  };

  const updateTimes = (_date, hour, day, start) => {
    hour = hour.toLowerCase().replace(/\s/g, "");
    const tempTimes = state.times;
    tempTimes[day][start ? "start" : "end"] = hour;
    setState((prev) => ({ ...prev, times: tempTimes }));
  };
  
  return (
    <div className={classes.paper}>
      <h4 style={{ color: "#1B4370" }}>Add Place</h4>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ paddingBottom: "10px", color: "#1B4370", fontSize: "20px" }}
        >
          Place Name
        </div>
        <TextField
          id="name"
          placeholder="Place Name"
          variant="outlined"
          type="text"
          required
          onChange={(event) => {
            setState((prev) => ({ ...prev, name: event.target.value }));
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ paddingBottom: "10px", color: "#1B4370", fontSize: "20px" }}
        >
          Group
        </div>
        <FormControl>
          <Select
            labelId="group-select-label"
            id="group-select"
            value={state.group}
            onChange={(event) =>
              setState((prev) => ({ ...prev, group: event.target.value }))
            }
            variant="outlined"
          >
            {options.map((group) => (
              <MenuItem value={group}>{group}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ paddingBottom: "10px", color: "#1B4370", fontSize: "20px" }}
        >
          Enter Hours
        </div>
        {createTable(
          { width: "1400 px" },
          labels,
          <tr>
            {days.map((day) => {
              return (
                <td>
                  <DayEditor
                    day={day}
                    start={getProperDate(state.times[day].start)}
                    end={getProperDate(state.times[day].end)}
                    callback={updateTimes}
                    key={"_" + Math.random().toString(36).substr(2, 9)}
                  />
                </td>
              );
            })}
          </tr>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{
            backgroundColor: !state.name ? "#5482B6" : "#1B4370",
            color: "white",
            width: "20%",
          }}
          onClick={post}
          disabled={!state.name}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
