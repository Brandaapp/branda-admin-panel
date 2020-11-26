import { useState, useEffect } from 'react';
import WeekPicker from './WeekPicker';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const { DateTime } = require('luxon');
const axios = require('axios');

export default function ScheduleView() {
    const [weekStart, setWeekStart] = useState(null);
    const [weekEnd, setWeekEnd] = useState(null);
    const [weekNum, setWeekNum] = useState(-1);
    const [scheduleData, setScheduleData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    async function setWeek(start, end, num) {
        await axios.get(`/api/schedules/${num}`)
            .then(response => {
                setScheduleData(response.data);
                console.log(response);
            })
            .catch(err => console.log("Error fetching schedule info", err));
        setWeekStart(start);
        setWeekEnd(end);
        setWeekNum(num);
    }

    useEffect(() => {
        if (weekNum === -1) {
            const day = new Date();
            const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
            setWeek(date.minus({ days: (date.weekday % 7) }).toJSDate(),
                date.plus({ days: (6 - (date.weekday % 7)) }).toJSDate(),
                date.weekNumber);
        }
    });

    function renderRows() {
        return (scheduleData.map(schedule => {
            return (
                <tr>
                    <td>{schedule.name}</td>
                    <td>{schedule.monday === "11:00am-11:01am" ? "Closed" : schedule.monday}</td>
                    <td>{schedule.tuesday === "11:00am-11:01am" ? "Closed" : schedule.tuesday}</td>
                    <td>{schedule.wednesday === "11:00am-11:01am" ? "Closed" : schedule.wednesday}</td>
                    <td>{schedule.thursday === "11:00am-11:01am" ? "Closed" : schedule.thursday}</td>
                    <td>{schedule.friday === "11:00am-11:01am" ? "Closed" : schedule.friday}</td>
                    <td>{schedule.saturday === "11:00am-11:01am" ? "Closed" : schedule.saturday}</td>
                    <td>{schedule.sunday === "11:00am-11:01am" ? "Closed" : schedule.sunday}</td>
                </tr>
            );
        }));
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    if (weekNum === -1) return <img src="/loading-spinner.gif" style={{ width: "100px" }} />
    else return (
        <div>
            <h5>Week at a glance - current week is:</h5>
            <Button aria-describedby={id} variant="contained" style={{ backgroundColor: "#1B4470", color: "white" }} onClick={handleClick}>
                Choose Week
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <WeekPicker setWeek={setWeek} firstDay={weekStart} lastDay={weekEnd} />
            </Popover>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Wed</th>
                    <th>Thurs</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    );
}