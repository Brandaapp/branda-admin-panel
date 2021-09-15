import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DayEditor from "./DayEditor";
import createTable from "../utils/renderUtils/tableGenerator";
import { getDefaultWeekTimes } from "../utils/dateUtils";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "80%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddPlaceForm(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [group, setGroup] = useState("Dining");
  const [times, setTimes] = useState([]);

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

  const post = async () => {
    const data = {
      name: name,
      group: group,
    };

    axios.post(`api/places/add`, data).then((response) => {
      console.log(response);
      const emp_id = response.data._id;
      axios.post(`api/schedules`, { ...data, emp_id }).then((response) => {
        console.log(response);
        onSubmit();
      });
    });
  };

  const updateTimes = (_date, hour, day, start) => {};
  console.log(group);
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
            setName(event.target.value);
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
            value={group}
            onChange={(event) => setGroup(event.target.value)}
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
                    callback={() => console.log("update")}
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
          style={{ backgroundColor: "#1B4370", color: "white", width: "20%" }}
          onClick={post}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
