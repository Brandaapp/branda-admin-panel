import logger from '../../../../../utils/loggers/server';
const mongoose = require('mongoose');
const BranvanNotif = require('../../../../../models/BranvanNotif');

// POST method
export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const temp = new BranvanNotif({
        _id: new mongoose.Types.ObjectId(),
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        type: req.body.type,
        content: req.body.content
      });
      temp.save((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error posting announcements');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, doc });
          logger.info({ res }, 'Posted announcement');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be POST on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be POST on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
};
