import fetch, { FetchError } from 'node-fetch';
import logger from '../../../../../utils/loggers/server.mjs';

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
  logger.debug({ todayHours }, 'Today library hours object constructed');
  return todayHours;
}

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
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
          logger.info({ res }, 'Fetched today library hours');
          resolve();
        })
        .catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              logger.error({ err }, 'Fetching today\'s library hours failed: Incorrect domain.');
              res.status(500).send({ err, msg: 'Fetching today\'s library hours failed: Incorrect domain.' });
              logger.info({ res });
              resolve();
            } else {
              logger.error({ err }, 'Error fetching today library hours');
              res.status(500).send({ err });
              logger.info({ res });
              resolve();
            }
          } else if (err instanceof SyntaxError) {
            // error from response.json(), non-json text received
            logger.error({ err }, `JSON syntax error. Check response data from ${LIBRARY_HOURS_TODAY_URL}.`);
            res.status(500)
              .send({ err, msg: `JSON syntax error. Check response data from ${LIBRARY_HOURS_TODAY_URL}.` });
            logger.info({ res });
            resolve();
          } else if (err instanceof ReferenceError) {
            // error from parseAndReduceTodayHours(), json schema changed
            logger.error({ err }, `JSON schema error. Check response data from ${LIBRARY_HOURS_TODAY_URL}.`);
            res.status(500)
              .send({ err, msg: `JSON schema error. Check response data from ${LIBRARY_HOURS_TODAY_URL}.` });
            logger.info({ res });
            resolve();
          } else {
            // response.ok == false
            logger.error(`Fetching today's library hours failed. Status code: ${err}`);
            res.status(err).send({ msg: `Fetching today's library hours failed. Status code: ${err}` });
            logger.info({ res });
            resolve();
          }
        });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
