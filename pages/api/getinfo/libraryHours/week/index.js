import fetch from 'node-fetch';
const BRANDEIS_LIBRARY_HOURS_WEEK = "https://calendar.library.brandeis.edu/api_hours_grid.php?format=json&weeks=1";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 *
 * @param {Array} libraryLocations
 */
 function parseAndReduceWeekHours(libraryLocations) {
    // TODO rearrange the data so it is by day not by location
    // Sunday = day 0
    // Scheme:
    // [{"day":"Sunday","date":"YYYY-MM-DD","hours": [{"location":"Main Library", "times":"closed"},{"location":"Research Online Chat", "times":{"from":"11am","to":"5pm"}}]}]
    let weekHours = [];
    let hoursByDay = {};
  
    WEEKDAYS.forEach(weekday => {
      hoursByDay[weekday] = [];
    });
  
    libraryLocations.forEach(location => {
      let locationHours = {};
      locationHours.name = location.name;
      locationHours.hours = location.weeks[0];
      weekHours.push(locationHours);
  
      for (let day in location.weeks[0]) {
        hoursByDay[day]["date"] = location.weeks[0][day]["date"];
        hoursByDay[day].push({"location": location.name, "times": location.weeks[0][day]["times"]});
      }
    });
  
    let result = [];
  
    for (let day in hoursByDay) {
      result.push({"day": day, "date": hoursByDay[day]["date"], "hours": hoursByDay[day]});
    }
  
    return result;
}

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            fetch(BRANDEIS_LIBRARY_HOURS_WEEK)
                .then(response => response.json())
                .then(data => parseAndReduceWeekHours(data.locations))
                .then(data => res.send(data));
        }
    })
}