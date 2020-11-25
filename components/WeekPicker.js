import { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const { DateTime } = require('luxon');
const today = DateTime.local();
const weekStyle = { outside: { color: '#8b9898 !important' }, today: { color: '#171B1F' } };

export default function WeekPicker(props) {
    const [firstDay, setFirstDay] = useState(today.minus({ days: (today.weekday % 7) }).toJSDate());
    const [lastDay, setLastDay] = useState(today.plus({ days: (6 - (today.weekday % 7)) }).toJSDate());
    const [hoverRange, setHoverRange] = useState(undefined);

    function selectWeek(day) {
        const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
        setFirstDay(date.minus({ days: (date.weekday % 7) }).toJSDate());
        setLastDay(date.plus({ days: (6 - (date.weekday % 7)) }).toJSDate());
    }

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