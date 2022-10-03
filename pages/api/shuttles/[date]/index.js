import dbConnect from '../../../../utils/dbConnect';
import logger from '../../../../utils/loggers/server.mjs';
const ShuttleActivity = require('../../../../models/ShuttleActivity');
const { DateTime } = require('luxon');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    const { query: { date } } = req;
    const start = DateTime.fromISO(date).startOf('day').toJSDate();
    const end = DateTime.fromISO(date).endOf('day').toJSDate();
    logger.debug({ start }, 'Parsed start time');
    logger.debug({ end }, 'Parsed end time');
    if (req.method === 'PATCH') {
      const temp = {
        start: req.body.start,
        end: req.body.end,
        busID: req.body.busID,
        busName: req.body.busName,
        route: req.body.route,
        ID: req.body.ID
      };
      /*
            11/30/2020
            Note: MongoDB $ne query operator behaves in an unexpected way when used with arrays
            explanation here:
            https://stackoverflow.com/questions/10907843/mongo-ne-query-with-an-array-not-working-as-expected/36484191
         */
      ShuttleActivity.updateOne(
        { date: { $gte: start, $lte: end }, 'times.ID': { $ne: req.body.ID } },
        { $addToSet: { times: temp } },
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
      ShuttleActivity.findOne({
        date: {
          $gte: start,
          $lte: end
        }
      }, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error fetching shuttle activity');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn('Could not find shuttle activity with given date');
          res.status(404).send('Could not find date');
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Fetched shuttle activity with date');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be PATCH or GET on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
