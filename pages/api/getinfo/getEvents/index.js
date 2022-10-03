import dbConnect from '../../../../utils/dbConnect';
import CalendarEvent from '../../../../models/CalendarEvent';
import logger from '../../../../utils/loggers/server.mjs';
const _ = require('lodash');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      const year = req.query.year || false;
      const month = req.query.month || false;
      if (year && month) {
        CalendarEvent.find({ year: year, month: month }).exec((err, docs) => {
          if (err) {
            logger.error({ err }, 'Error finding calendar event');
            res.status(500).send({ err: err });
            logger.info({ res });
            resolve();
          } else {
            const objGrouping = _.groupBy(docs, 'dateForgroup');
            const arrFinalFormat = [];
            for (const date in objGrouping) {
              arrFinalFormat.push({ day: date, events: objGrouping[date] });
            }
            logger.debug({ arrFinalFormat }, 'Formatted calendar events');
            res.send(arrFinalFormat);
            logger.info({ res }, 'Fetched calendar events');
            resolve();
          }
        });
      } else {
        logger.warn('No year or month provided');
        res.status(400).send({ err: 'no year or month' });
        logger.info({ res });
        resolve();
      }
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
