import dbConnect from '../../../utils/dbConnect';
import logger from '../../../utils/loggers/server.mjs';
const PlaceSchedule = require('../../../models/PlaceSchedule');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const temp = new PlaceSchedule({
        emp_id: req.body.emp_id,
        Name: req.body.name,
        group: req.body.group,
        active: (req.body.active ? req.body.active : 1),
        weeks: (req.body.weeks ? req.body.weeks : []),
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday,
        sunday: req.body.sunday
      });
      temp.save((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error creating new place schedule');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Created place schedule');
          resolve();
        }
      });
    } else if (req.method === 'GET') {
      PlaceSchedule.find({ active: 1 }, (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching active place schedules');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          const places = docs.map(place => {
            return { name: place.Name, group: place.group };
          });
          logger.debug({ places }, 'Computed places');
          res.send(places);
          logger.info({ res }, 'Fetched active place schedules');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be POST or GET on ${req.url}`);
      res.status(405).send(`HTTP method must be POST or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
