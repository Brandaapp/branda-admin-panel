import ShuttleStop from '../../../../../models/ShuttleStop';
import logger from '../../../../../utils/loggers/server';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      const { query: { route } } = req;
      if (!route) {
        logger.warn('A route name must be provided');
        res.status(400).send('A route name must be provided');
        logger.info({ res });
        resolve();
      } else {
        ShuttleStop.findOne({ route }, (err, doc) => {
          if (err) {
            logger.error({ err }, `Error finding shuttle for route ${route}`);
            res.status(500).send(err);
            logger.info({ res });
            resolve();
          } else if (!doc) {
            logger.warn(`No shuttle found for route ${route}`);
            res.status(404).send(`No shuttle found for route ${route}`);
            logger.info({ res });
            resolve();
          } else {
            res.status(200).send(doc);
            logger.info({ res }, 'Fetched shuttle stop');
            resolve();
          }
        });
      }
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
