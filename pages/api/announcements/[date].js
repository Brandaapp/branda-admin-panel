import dbConnect from '../../../utils/dbConnect';
import logger from '../../../utils/loggers/server';
const Announcement = require('../../../models/Announcement');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      const { query: { date } } = req;
      Announcement.find({ startTime: { $lte: date },
        endTime: { $gte: date } },
      (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching announcement');
          res.status(500).send('Oop');
          logger.info({ res });
          resolve();
        } else {
          res.send(docs);
          logger.info({ res }, 'Announcement fetched');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info(res);
      resolve();
    }
  });
};
