import fetch, { FetchError } from 'node-fetch';
import logger from '../../../../../utils/loggers/server.mjs';
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

  logger.debug({ result }, 'Library week hour object consructed');

  return result;
}

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
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
          res.send({ success: true, data });
          logger.info({ res }, 'Library week hours fetched');
          resolve();
        }).catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              logger.error({ err }, 'Fetching weeks\'s library hours failed: Incorrect domain.');
              res.status(500)
                .send({ success: false, error: err, msg: 'Fetching week\'s library hours failed: Incorrect domain.' });
              logger.info({ res });
              resolve();
            } else {
              logger.error(`Fetching weeks's library hours failed. Status code: ${err}`);
              res.status(err)
                .send({ success: false, error: err, msg: `Fetching week's library hours failed. Status code: ${err}` });
              resolve();
            }
          } else if (err instanceof SyntaxError) {
            // error from response.json(), non-json text received
            logger.error({ err }, `JSON syntax error. Check response data from ${BRANDEIS_LIBRARY_HOURS_WEEK}.`);
            res.status(500)
              .send({ success: false, error: err, msg: `Check response data from ${BRANDEIS_LIBRARY_HOURS_WEEK}.` });
            logger.info({ res });
            resolve();
          } else if (err instanceof ReferenceError) {
            // error from parseAndReduceWeekHours(), json schema changed
            logger.error({ err }, `JSON schema error. Check response data from ${BRANDEIS_LIBRARY_HOURS_WEEK}.`);
            res.status(500)
              .send({ success: false, error: err, msg: `Check response data from ${BRANDEIS_LIBRARY_HOURS_WEEK}.` });
            logger.info({ res });
            resolve();
          } else {
            // response.ok == false
            logger.error(`Fetching weeks's library hours failed. Status code: ${err}`);
            res.status(err)
              .send({ success: false, error: `Fetching week's library hours failed. Status code: ${err}` });
            logger.info({ res });
            resolve();
          }
        });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be GET on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
};
