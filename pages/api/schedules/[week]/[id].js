import logger from '../../../../utils/loggers/server.mjs';
const PlaceSchedule = require('../../../../models/PlaceSchedule');

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    const {
      query: { week, id }
    } = req;
    if (req.method === 'PATCH') {
      const weekInfo = {
        sunday: req.body.sunday,
        saturday: req.body.saturday,
        friday: req.body.friday,
        thursday: req.body.thursday,
        wednesday: req.body.wednesday,
        tuesday: req.body.tuesday,
        monday: req.body.monday,
        week: parseInt(week)
      };
      PlaceSchedule.updateOne(
        { emp_id: id },
        { $set: { [`weeks.${week}`]: weekInfo } },
        (err, result) => {
          if (err) {
            logger.error({ err }, 'Error updaying place schedule');
            res.status(500).send({ err });
            logger.info({ res });
            resolve();
          } else {
            res.send(result);
            logger.info({ res }, 'Updated place schedule');
            resolve();
          }
        }
      );
    } else if (req.method === 'GET') {
      PlaceSchedule.findOne({ emp_id: id }, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error getting place schedule');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn('Could not find schedule');
          res.status(404).send('Could not find schedule');
          logger.info({ res });
          resolve();
        } else {
          res.send(doc.weeks > week ? doc.weeks[week] : null);
          logger.info({ res }, 'Fetched place schedule');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET or PATCH on ${req.url}`);
      res.status(405).send(`HTTP method must be GET or PATCH on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
