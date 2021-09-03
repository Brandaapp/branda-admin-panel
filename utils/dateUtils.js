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

export function getProperDate(time) {
    let am = time.indexOf("am") > -1;
    const date = new Date();

    let strippedTime = undefined;

    if (am) {
      strippedTime = time.substring(0, time.indexOf("am")).trim();
    } else {
      strippedTime = time.substring(0, time.indexOf("pm")).trim();
    }

    let partition = strippedTime.split(":");
    let hour = partition[0];
    let minute = partition[1] === undefined ? "00" : partition[1];

    if (am) {
      if (hour === "12") {
        hour = "0";
      }
    } else {
      if (hour !== "12") {
        let n = parseInt(hour) + 12;
        hour = n.toString();
      }
    }

    date.setHours(hour);
    date.setMinutes(minute);

    return date;
  }
