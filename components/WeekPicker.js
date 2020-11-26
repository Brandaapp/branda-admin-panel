import { useState, useEffect } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const { DateTime } = require('luxon');
const axios = require('axios');
const weekStyle = { outside: { color: '#8b9898 !important' }, today: { color: '#171B1F' } };

export default function WeekPicker(props) {
    const [firstDay, setFirstDay] = useState(props.firstDay);
    const [lastDay, setLastDay] = useState(props.lastDay);
    const [hoverRange, setHoverRange] = useState(undefined);

    function selectWeek(day) {
        const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
        setFirstDay(date.minus({ days: (date.weekday % 7) }).toJSDate());
        setLastDay(date.plus({ days: (6 - (date.weekday % 7)) }).toJSDate());
        props.setWeek(firstDay, lastDay, date.weekNumber);
    }

    /* useEffect(() => {
        if (firstDay === null) selectWeek(new Date());
    }); */

    function enterWeek(day) {
        const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
        setHoverRange({
            from: date.minus({ days: (date.weekday % 7) }).toJSDate(),
            to: date.plus({ days: (6 - (date.weekday % 7)) }).toJSDate()
        });
    }

    function exitWeek() {
        setHoverRange(undefined);
    }
    
    return (
        <div className="WeekPicker">
            <DayPicker
                modifiers={{
                    selectedRange: {
                        before: lastDay,
                        after: firstDay
                    },
                    start: firstDay,
                    end: lastDay,
                    hoverRange: hoverRange
                }}
                modifiersStyles={weekStyle}
                showOutsideDays
                onDayMouseEnter={enterWeek}
                onDayMouseLeave={exitWeek}
                onDayClick={selectWeek}
            />
        </div>
    )
}