import fetch, { FetchError } from 'node-fetch';
const BRANDEIS_LIBRARY_HOURS_WEEK = 'https://calendar.library.brandeis.edu/api_hours_grid.php?format=json&weeks=1';
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 *
 * @param {Array} libraryLocations
 */
function parseAndReduceWeekHours (libraryLocations) {
  // TODO rearrange the data so it is by day not by location
  // Sunday = day 0
  // Scheme:
  // [{"day":"Sunday","date":"YYYY-MM-DD","hours":
  //     [{"location":"Main Library", "times":"closed"},
  //         {"location":"Research Online Chat", "times":{"from":"11am","to":"5pm"}}]}]
  const weekHours = [];
  const hoursByDay = {};

  WEEKDAYS.forEach(weekday => {
    hoursByDay[weekday] = [];
  });

  libraryLocations.forEach(location => {
    const locationHours = {};
    locationHours.name = location.name;
    locationHours.hours = location.weeks[0];
    weekHours.push(locationHours);

    for (const day in location.weeks[0]) {
      hoursByDay[day]['date'] = location.weeks[0][day]['date'];
      hoursByDay[day].push({ 'location': location.name, 'times': location.weeks[0][day]['times'] });
    }
  });

  const result = [];

  for (const day in hoursByDay) {
    result.push({ 'day': day, 'date': hoursByDay[day]['date'], 'hours': hoursByDay[day] });
  }

  return result;
}

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      fetch(BRANDEIS_LIBRARY_HOURS_WEEK)
        .then(response => {
          if (!response.ok) {
            throw response.status;
          } else {
            return response.json();
          }
        })
        .then(data => parseAndReduceWeekHours(data.locations))
        .then(data => {
          res.send(data);
          resolve();
        }).catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              res.status(500).send({ err, msg: 'Fetching weeks\'s library hours failed: Incorrect domain.' });
              resolve();
            } else {
              res.status(err).send({ err, msg: `Fetching weeks's library hours failed. Status code: ${err}` });
              resolve();
            }
          } else if (err instanceof SyntaxError) {
            // error from response.json(), non-json text received
            res.status(500)
              .send({ err, msg: `JSON syntax error. Check response data from ${BRANDEIS_LIBRARY_HOURS_WEEK}.` });
            resolve();
          } else if (err instanceof ReferenceError) {
            // error from parseAndReduceWeekHours(), json schema changed
            res.status(500)
              .send({ err, msg: `JSON schema error. Check response data from ${BRANDEIS_LIBRARY_HOURS_WEEK}.` });
            resolve();
          } else {
            // response.ok == false
            res.status(err).send({ msg: `Fetching weeks's library hours failed. Status code: ${err}` });
            resolve();
          }
        });
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
