import fetch, { FetchError } from 'node-fetch';

const LIBRARY_HOURS_TODAY_URL = 'https://calendar.library.brandeis.edu/api_hours_today.php?format=json';

/**
 * Pull relevant data from today's library hours:
 * Library sub-location name
 * Open/closed status
 * Hours
 * @param {Array} libraryLocations
 */
function parseAndReduceTodayHours (libraryLocations) {
  const todayHours = [];
  libraryLocations.forEach(location => {
    const locationHours = {};
    locationHours.name = location.name;
    locationHours.isOpen = location.times.status;
    locationHours.hours = location.times.hours;
    if (location.times.text) {
      locationHours.optionalText = location.times.text;
    }
    todayHours.push(locationHours);
  });
  return todayHours;
}

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      fetch(LIBRARY_HOURS_TODAY_URL)
        .then(response => {
          if (!response.ok) {
            throw response.status; // throw a plain Number
          } else {
            return response.json();
          }
        })
        .then(data => parseAndReduceTodayHours(data.locations))
        .then(data => {
          res.send(data);
          resolve();
        })
        .catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              res.status(500).send({ err, msg: 'Fetching today\'s library hours failed: Incorrect domain.' });
              resolve();
            } else {
              res.status(500).send({ err });
              resolve();
            }
          } else if (err instanceof SyntaxError) {
            // error from response.json(), non-json text received
            res.status(500)
              .send({ err, msg: `JSON syntax error. Check response data from ${LIBRARY_HOURS_TODAY_URL}.` });
            resolve();
          } else if (err instanceof ReferenceError) {
            // error from parseAndReduceTodayHours(), json schema changed
            res.status(500)
              .send({ err, msg: `JSON schema error. Check response data from ${LIBRARY_HOURS_TODAY_URL}.` });
            resolve();
          } else {
            // response.ok == false
            res.status(err).send({ msg: `Fetching today's library hours failed. Status code: ${err}` });
            resolve();
          }
        });
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
