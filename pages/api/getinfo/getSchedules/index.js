import PlaceSchedule from '../../../../models/PlaceSchedule';
import logger from '../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      PlaceSchedule.find({ active: 1 }).exec(function (err, doc) {
        if (err) {
          logger.error({ err }, 'Error fetching place schedules');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, doc });
          logger.info({ res }, 'Fetched place schedules');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be GET on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
};
