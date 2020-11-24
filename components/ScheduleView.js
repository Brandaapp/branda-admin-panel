import { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const { DateTime } = require('luxon');
const weekStyle = {
    selectedRange: { backgroundColor: '#2969ac', color: 'white', borderRadius: '0px', outline: 'none', border: '1px solid transparent' },
    start: { backgroundColor: '#22568e', color: 'white', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' },
    end: { backgroundColor: '#22568e', color: 'white', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' },
    outside: { color: '#8b9898 !important'}
};

export default function ScheduleView() {
    const [firstDay, setFirstDay] = useState(new Date());
    const [lastDay, setLastDay] = useState(new Date());

    function selectWeek(day) {
        setFirstDay(day.minus({ days: (day.weekday % 7) }).toJSDate());
        setLastDay(day.plus({ days: (6 - (day.weekday % 7)) }).toJSDate());
    }

    useEffect(() => {
        selectWeek(DateTime.local(2020, 11, 29));
    }, [firstDay.getDay()]);
    
    function handleClick(day) {
        setSelected(day);
    }
    
    return (
        <div>
            <DayPicker
                modifiers={{
                    selectedRange: {
                        before: lastDay,
                        after: firstDay
                    },
                    start: firstDay,
                    end: lastDay
                }}
                modifiersStyles={weekStyle}
                showOutsideDays
            />
        </div>
    )
}