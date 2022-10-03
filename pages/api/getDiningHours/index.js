import dbConnect from '../../../utils/dbConnect';
import DiningHours from '../../../models/DiningHours';
import logger from '../../../utils/loggers/server.mjs';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      DiningHours.find({}).exec((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error fetching dining hours');
          res.status(500).send({ err: err });
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Fetched dining hours');
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
