import dbConnect from '../../../../../utils/dbConnect.mjs';
import logger from '../../../../../utils/loggers/server.js';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      if (!req.query.name) {
        logger.warn('A name must be provided');
        res.status(400).send('A name must be provided');
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
