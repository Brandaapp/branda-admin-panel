import logger from '../../../../utils/loggers/server.mjs';
import ShuttleActivity from '../../../../models/ShuttleActivity.js';
const { DateTime } = require('luxon');

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    const { query: { date, id } } = req;
    const start = DateTime.fromISO(date).startOf('day').toJSDate();
    const end = DateTime.fromISO(date).endOf('day').toJSDate();
    logger.debug({ start }, 'Parsed start time');
    logger.debug({ end }, 'Parsed end time');
    if (req.method === 'DELETE') {
      ShuttleActivity.updateOne({ date: { $gte: start, $lte: end }, 'times.ID': { $eq: id } },
        { $pull: { times: { ID: id } } },
        (err, result) => {
          if (err) {
            logger.error({ err }, 'Error pulling shuttle out of times');
            res.status(500).send({ err });
            logger.info({ res });
            resolve();
          } else {
            res.send(result);
            logger.info({ res }, 'Pulled shuttle out of times');
            resolve();
            // TODO: connect to samsara api
          }
        }
      );
    } else if (req.method === 'PATCH') {
      const info = {};
      if (req.body.start) info['times.$.start'] = req.body.start;
      if (req.body.end) info['times.$.end'] = req.body.end;
      if (req.body.busID) info['times.$.busID'] = req.body.busID;
      if (req.body.busName) info['times.$.busName'] = req.body.busName;
      if (req.body.route) info['times.$.route'] = req.body.route;
      ShuttleActivity.updateOne({ date: { $gte: start, $lte: end }, 'times.ID': { $eq: id } },
        { $set: info },
        (err, result) => {
          if (err) {
            logger.error({ err }, 'Error updating shuttle activity');
            res.status(500).send({ err });
            logger.info({ res });
            resolve();
          } else {
            res.send(result);
            logger.info({ res }, 'Updated shuttle activity');
            resolve();
            // TODO: connect to samsara api
          }
        }
      );
    } else if (req.method === 'GET') {
      ShuttleActivity.findOne({ date: { $gte: start, $lte: end }, 'times.ID': { $eq: id } },
        (err, doc) => {
          if (err) {
            logger.error({ err }, 'Error getting shuttle activity');
            res.status(500).send({ err });
            resolve();
          } else if (!doc) {
            logger.warn('Could not find shuttle activity');
            res.status(404).send('Could not find shuttle activity');
            logger.info({ res });
            resolve();
          } else {
            const route = doc.times.find((element) => { return element.ID === id; });
            logger.debug({ route }, 'Route found');
            res.send(route);
            logger.info({ res }, 'Fetched shuttle activity');
            resolve();
          }
        }
      );
    } else {
      logger.warn(`HTTP method must be DELETE, PATCH, or GET on ${req.url}`);
      res.status(405).send(`HTTP method must be DELETE, PATCH, or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
