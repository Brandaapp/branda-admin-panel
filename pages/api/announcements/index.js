import dbConnect from '../../../utils/dbConnect';
import logger from '../../../utils/loggers/server';
const mongoose = require('mongoose');
const Announcement = require('../../../models/Announcement');

dbConnect();

// POST method
export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const temp = new Announcement({
        _id: new mongoose.Types.ObjectId(),
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        type: req.body.type,
        content: req.body.content
      });
      temp.save((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error posting announcements');
          res.status(500).send('Oop');
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Posted announcement');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be POST on ${req.url}`);
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
