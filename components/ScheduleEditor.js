import { useState, useEffect } from "react";
import { weekStart, weekEnd, weekNum } from "../utils/dateUtils";
import WeekPicker from "./WeekPicker";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import WeekEditor from "./WeekEditor";

const axios = require("axios");

export default function ScheduleView(props) {
  const [state, setState] = useState({
    weekStart: null,
    weekEnd: null,
    weekNum: -1,
    scheduleData: [],
    updateNum: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  async function setWeek(start, end, num) {
    await axios
      .get(`/api/schedules/${num}`)
      .then((response) => {
        setState({
          weekStart: start,
          weekEnd: end,
          weekNum: num,
          scheduleData: response.data,
          updateNum: state.updateNum + 1,
        });
      })
      .catch((err) => console.log("Error fetching schedule info", err));
    if (!props.dataFetched) props.setDataFetched(true);
  }

  async function resetWeekSchedule() {
    await axios.get(`/api/schedules/${state.weekNum}`).then((response) => {
      setState((prev) => ({ ...prev, scheduleData: response.data }));
    });
  }

  useEffect(() => {
    if (state.weekNum === -1) {
      const day = new Date();
      setWeek(weekStart(day), weekEnd(day), weekNum(day));
    }
  });

  function renderRows() {
    return state.scheduleData.map((schedule) => {
      return (
        <WeekEditor
          schedule={schedule}
          updateNum={state.updateNum}
          weekNum={state.weekNum}
          refresh={resetWeekSchedule}
        />
      );
    });
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;
  if (state.weekNum === -1)
    return (
      <img src="/branda-admin-loading-gif.gif" style={{ width: "280px" }} />
    );
  else
    return (
      <div>
        <h5>
          Schedule Editor - Current week is:
          <span style={{ marginLeft: "10px", fontWeight: "500" }}>
            {state.weekStart.toLocaleDateString("en-US")} -{" "}
            {state.weekEnd.toLocaleDateString("en-US")}
          </span>
        </h5>
        <Button
          aria-describedby={id}
          variant="contained"
          style={{ backgroundColor: "#1B4370", color: "white" }}
          onClick={handleClick}
        >
          Choose Week
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <WeekPicker
            setWeek={setWeek}
            firstDay={state.weekStart}
            lastDay={state.weekEnd}
          />
        </Popover>
        <table style={{ width: "1400px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mon</th>
              <th>Tues</th>
              <th>Wed</th>
              <th>Thurs</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
              <th>Admin Options</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    );
}
