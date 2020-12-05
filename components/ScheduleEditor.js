import { useState, useEffect } from "react";
import { weekStart, weekEnd, weekNum } from "../utils/dateUtils";
import WeekPicker from "./WeekPicker";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

const axios = require("axios");

export default function ScheduleEditor(props) {
  const [state, setState] = useState({
    weekStart: null,
    weekEnd: null,
    weekNum: -1,
    scheduleData: [],
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
        });
        console.log(response);
      })
      .catch((err) => console.log("Error fetching schedule info", err));
    if (!props.dataFetched) props.setDataFetched(true);
  }

  useEffect(() => {
    if (state.weekNum === -1) {
      const day = new Date();
      setWeek(weekStart(day), weekEnd(day), weekNum(day));
    }
  });

  if (state.weekNum === -1)
    return (
      <img src="/branda-admin-loading-gif.gif" style={{ width: "280px" }} />
    );
  else return (<div>
      
  </div>);
}
