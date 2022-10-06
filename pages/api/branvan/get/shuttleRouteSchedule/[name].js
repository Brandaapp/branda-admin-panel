import ShuttleRouteSchedule from '../../../../../models/ShuttleRouteSchedule';
import logger from '../../../../../utils/loggers/server';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      const name = req.query.name;
      ShuttleRouteSchedule.find({ name }, (err, doc) => {
        if (err) {
          logger.error({ err }, `Error finding shuttle with name ${name}`);
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn(`Could not find a schedule for route with name ${name}`);
          res.status(404).send(`Could not find a schedule for route with name ${name}`);
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Shuttle route schedule fetched');
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
