import { useState } from 'react';
import { weekStart, weekEnd, weekNum } from '../utils/dateUtils';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const weekStyle = { outside: { color: '#8b9898 !important' } };

export default function WeekPicker (props) {
  const [firstDay, setFirstDay] = useState(props.firstDay);
  const [lastDay, setLastDay] = useState(props.lastDay);
  const [hoverRange, setHoverRange] = useState(undefined);

  async function selectWeek (day) {
    const first = weekStart(day);
    const last = weekEnd(day);
    setFirstDay(first);
    setLastDay(last);
    props.setWeek(first, last, weekNum(day));
  }

  function enterWeek (day) {
    setHoverRange({
      from: weekStart(day),
      to: weekEnd(day)
    });
  }

  function exitWeek () {
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
  );
}
