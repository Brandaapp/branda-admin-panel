import dbConnect from '../../../../utils/dbConnect';
import logger from '../../../../utils/loggers/server.mjs';
const PlaceSchedule = require('../../../../models/PlaceSchedule');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      PlaceSchedule.find({ active: 1 }, (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching active place schedules');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          const { query: { week } } = req;
          const schedules = [];
          docs.forEach(place => {
            if (place.weeks.length > week) {
              const weekInfo = place.weeks[week];
              schedules.push({
                name: place.Name,
                sunday: weekInfo.sunday,
                saturday: weekInfo.saturday,
                friday: weekInfo.friday,
                thursday: weekInfo.thursday,
                wednesday: weekInfo.wednesday,
                tuesday: weekInfo.tuesday,
                monday: weekInfo.monday,
                emp_id: place.emp_id
              });
            }
          });
          res.send(schedules);
          logger.info({ res }, 'Fetched active place schedules');
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
