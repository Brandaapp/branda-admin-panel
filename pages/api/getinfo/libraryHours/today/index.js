import fetch from "node-fetch";

const LIBRARY_HOURS_TODAY_URL = "https://calendar.library.brandeis.edu/api_hours_today.php?format=json";

/**
 * Pull relevant data from today's library hours:
 * Library sub-location name
 * Open/closed status
 * Hours
 * @param {Array} libraryLocations 
 */
function parseAndReduceTodayHours(libraryLocations){
    let todayHours = [];
    libraryLocations.forEach(location => {
      let locationHours = {};
      locationHours.name = location.name;
      locationHours.isOpen = location.times.status;
      locationHours.hours = location.times.hours;
      if(location.times.text){
        locationHours.optionalText = location.times.text;
      }
      todayHours.push(locationHours);
    });
    return todayHours;
}

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            fetch(LIBRARY_HOURS_TODAY_URL)  // Possible 4xx and 5xx status code here
                .then(response => response.json())
                .then(data => parseAndReduceTodayHours(data.locations))
                .then(data => res.send(data));
                resolve();
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    })
}