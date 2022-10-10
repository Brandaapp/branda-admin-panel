import ShuttleStop from '../../../../../models/ShuttleStop';
import logger from '../../../../../utils/loggers/server';

export default (req, res) => {
  return new Promise((resolve) => {
    logger.info({ req });
    if (req.method === 'GET') {
      ShuttleStop.findOne({}, (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error getting stops');
          res.status(500).send(err);
          logger.info({ res });
          resolve();
        } else if (!docs) {
          logger.warn('No shuttles found');
          res.status(404).send('No shuttles found');
          logger.info({ res });
          resolve();
        } else {
          res.status(200).send(docs);
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
