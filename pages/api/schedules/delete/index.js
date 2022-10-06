import PlaceSchedule from '../../../../models/PlaceSchedule';
import logger from '../../../../utils/loggers/server.mjs';

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'PATCH') {
      PlaceSchedule.findOneAndUpdate(
        { emp_id: req.body.emp_id },
        { active: 0 }
      ).exec((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error changing place schedule to inactive');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Changed place schedule to inactive');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be PATCH on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
}
