const { DateTime } = require('luxon');

export function weekStart(day) {
    const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
    return date.minus({ days: (date.weekday % 7) }).toJSDate();
}

export function weekEnd(day) {
    const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
    return date.plus({ days: (6 - (date.weekday % 7)) }).toJSDate();
}

export function weekNum(day) {
    const date = DateTime.local(day.getFullYear(), day.getMonth() + 1, day.getDate());
    return date.weekNumber % 53;
}