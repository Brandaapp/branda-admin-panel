import logger from '../../../../utils/loggers/server.mjs';
import ShuttleActivity from '../../../../models/ShuttleActivity.js';
import dayjs from 'dayjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    const { query: { date } } = req;
    const start = dayjs(date).startOf('day');
    const end = dayjs(date).endOf('day');
    logger.debug({ start, end }, 'Computed start and end times');
    if (req.method === 'POST') {
      ShuttleActivity.findOne({ date: { $gte: start, $lte: end } })
        .then(doc => {
          if (doc) return doc;
          const newActivity = new ShuttleActivity({
            date
          });
          return newActivity.save();
        }).then(doc => {
          const times = doc.times;
          times.push({ ...req.body });
          return doc.save();
        }).then(updatedDoc => {
          res.status(201).send(updatedDoc);
          logger.info({ res }, 'Added new shuttle activity');
          resolve();
        }).catch(err => {
          logger.error({ err }, 'Error adding shuttle activity');
          res.status(500).send('Unable to create new shuttle activity document');
          logger.info({ res });
          resolve();
        });
    } else if (req.method === 'GET') {
      ShuttleActivity.findOne({
        date: {
          $gte: start,
          $lte: end
        }
      }).then(doc => {
        if (doc) return doc;
        const newActivity = new ShuttleActivity({
          date
        });
        logger.warn('Could not find shuttle activity with given date');
        return newActivity.save();
      }).then(doc => {
        res.send(doc);
        logger.info({ res }, 'Fetched shuttle activity with date');
        resolve();
      }).catch(err => {
        logger.error({ err }, 'Error fetching shuttle activity');
        res.status(500).send({ err });
        logger.info({ res });
        resolve();
      });
    } else {
      logger.warn(`HTTP method must be POST or GET on ${req.url}`);
      res.status(405).send(`HTTP method must be POST or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
