import fetch, { FetchError } from 'node-fetch';
import logger from '../../../../utils/loggers/server.mjs';
const moment = require('moment');

const GYM_TIME_URL = 'https://brandeis.dserec.com/online/fcscheduling/api/space';

const spaceIds = [ // tells us what ids to look for in the JSON file
  {
    name: 'tennis-indoor',
    ids: [5, 6, 7]
  },
  {
    name: 'tennis-outdoor',
    ids: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
  },
  {
    name: 'pool',
    ids: [34]
  }
];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getInfo = (doc) => {
  const info = []; // array that will eventually hold all of our JSON data
  const fall2021Excls = moment('2021-08-25');
  // loop through each day of the week finding when each space is open on that day
  for (let i = 0; i < days.length; i++) {
    // each day has the spaces which themselves have the times at which they are open that day
    const weekDay = { day: days[i], data: [] };
    weekDay.date = moment().day(i);
    spaceIds.forEach(space => { // loop through each space and get the info for each
      const activity = { name: space.name }; // initialize the space
      const apiActivity = doc.data.filter(data => space.ids.includes(data.id));
      apiActivity.forEach(obj => {
        const day = obj.actual_open_hours[i];
        const start = moment().startOf('day').add(day.hours[0].start, 'm');
        const end = moment().startOf('day').add(day.hours[0].end, 'm');
        if (moment().isSameOrBefore(fall2021Excls)) {
          end.hour(20);
          end.minute(0);
        }
        activity['time' + day.day] = start.format('HH:mm:ss') + '-' + end.format('HH:mm:ss');
      });
      /* for (let j = 0; j < space.ids.length; j++) { //for each of the ids associated with our space...
          let id = space.ids[j];
          for (let k = 0; k < doc.length; k++) { // ...look through each space in the doc to see if its id matches
              let area = doc[k];
              if (area.id === id) {
                //get this spaces hours for the current day of the week
                  let time = area.online_reservation_definition[i].summary[0];
                  let hours = time.start + "-" + time.end;
                  activity["time" + (j + 1)] = hours;
                  k = doc.length; //exit the loop
              }
          }
      } */
      weekDay.data.push(activity); // add the activity info to the array in our day object
    });
    info.push(weekDay); // add the day to our big array
  }
  // let output = JSON.stringify(info);
  logger.debug({ info }, 'Gym times info object constructed');
  return info;
};

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      fetch(GYM_TIME_URL)
        .then(response => {
          if (!response.ok) {
            throw response.status;
          } else {
            return response.json();
          }
        })
        .then(data => getInfo(data))
        .then(data => {
          res.send(data);
          logger.info({ res }, 'Fetched gym times');
          resolve();
        })
        .catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              logger.error({ err }, 'Fetching gym times failed: Incorrect domain.');
              res.status(500).send({ err, msg: 'Fetching gym times failed: Incorrect domain.' });
              logger.info({ res });
              resolve();
            } else {
              logger.error({ err }, `Fetching gym times failed. Status code: ${err}`);
              res.status(err).send({ err, msg: `Fetching gym times failed. Status code: ${err}` });
              logger.info({ res });
              resolve();
            }
          } else if (err instanceof SyntaxError) {
            // error from response.json(), non-json text received
            logger.error({ err }, `JSON syntax error. Check response data from ${GYM_TIME_URL}.`);
            res.status(500).send({ err, msg: `JSON syntax error. Check response data from ${GYM_TIME_URL}.` });
            logger.info({ res });
            resolve();
          } else if (err instanceof ReferenceError || err instanceof TypeError) {
            // error from getInfo(), json schema changed
            logger.error({ err }, `JSON schema error. Check response data from ${GYM_TIME_URL}.`);
            res.status(500).send({ err, msg: `JSON schema error. Check response data from ${GYM_TIME_URL}.` });
            logger.info({ res });
            resolve();
          } else {
            // response.ok == false
            logger.error(`Fetching gym times failed. Status code: ${err}`);
            res.status(err).send({ msg: `Fetching gym times failed. Status code: ${err}` });
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
