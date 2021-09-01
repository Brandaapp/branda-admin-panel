function mergeStartEndToSchedule(schedule, startTimes, endTimes, days) {
  let temp = {};
  temp["name"] = schedule.name;
  for (var day of days) {
    let start = startTimes[day];
    let end = endTimes[day];

    let format = (time) => {
      let t = new Date(time).toLocaleTimeString().toLocaleLowerCase();
      let parts = t.split(" ");
      return parts[0].substring(parts[0], parts[0].lastIndexOf(":")) + parts[1];
    };

    let startString = format(start);
    let endString = format(end);

    temp[day] = startString + "-" + endString;
  }
  return temp;
}

export {
    mergeStartEndToSchedule,
}