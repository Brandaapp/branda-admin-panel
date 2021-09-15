import { useState, useEffect } from "react";
import { weekStart, weekEnd, weekNum } from "../utils/dateUtils";
import WeekPicker from "./WeekPicker";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import WeekEditor from "./WeekEditor";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import AddPlaceForm from "./AddPlaceForm";
import Backdrop from '@material-ui/core/Backdrop';

import axios from "axios"

export default function ScheduleEditor(props) {
  const [state, setState] = useState({
    weekStart: null,
    weekEnd: null,
    weekNum: -1,
    scheduleData: [],
    updateNum: 0,
    weeks: undefined,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
  }, [state.weekNum]); // will only update when weekNum is changed (and defaulted to -1)

  /*
  "_" + Math.random().toString(36).substr(2, 9) was previously used for the key
  but was causing weekeditor components to reset state briefly
  */
  function renderRows() {
    const weeks = state.scheduleData.map((schedule) => {
      return (
        <WeekEditor
          schedule={schedule}
          updateNum={state.updateNum}
          weekNum={state.weekNum}
          refresh={resetWeekSchedule}
          key={schedule.name}
        />
      );
    });

    // weeks are now cached locally to avoid re-rendering on popup opening
    setState((prev) => ({ ...prev, weeks: weeks }));

    return weeks;
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
        <h5 style={{ paddingBottom: "20px" }}>
          Schedule Editor - Current week is:
          <span style={{ marginLeft: "10px", fontWeight: "500" }}>
            {state.weekStart.toLocaleDateString("en-US")}-{" "}
            {state.weekEnd.toLocaleDateString("en-US")}
          </span>
        </h5>
        <div style={{ paddingBottom: "20px", display: "flex", width: "25%", justifyContent: "space-between" }}>
          <Button
            aria-describedby={id}
            variant="contained"
            style={{ backgroundColor: "#1B4370", color: "white", width: "40%" }}
            onClick={handleClick}
          >
            Choose Week
          </Button>
          <Button
            aria-describedby={id}
            variant="contained"
            style={{ backgroundColor: "#1B4370", color: "white", width: "40%" }}
            onClick={() => setModalOpen(true)}
          >
            Add Place
          </Button>
        </div>
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
        <Modal
          open={modalOpen}
          style={{display: "flex", justifyContent: "center", alignItems: "center"}}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <AddPlaceForm onSubmit={() => setModalOpen(false)}/>
          </Fade>
        </Modal>
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
          <tbody>{state.weeks || renderRows()}</tbody>
        </table>
      </div>
    );
}
