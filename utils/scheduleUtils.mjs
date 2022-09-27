function mergeStartEndToSchedule (schedule, startTimes, endTimes, days) {
  const temp = {};
  temp['name'] = schedule.name;
  for (const day of days) {
    const start = startTimes[day];
    const end = endTimes[day];

    const format = (time) => {
      const t = new Date(time).toLocaleTimeString().toLocaleLowerCase();
      const parts = t.split(' ');
      return parts[0].substring(parts[0], parts[0].lastIndexOf(':')) + parts[1];
    };

    const startString = format(start);
    const endString = format(end);

    temp[day] = startString + '-' + endString;
  }
  return temp;
}

export {
  mergeStartEndToSchedule
};
