import SpecialEvent from '../../../../models/SpecialEvent';
import logger from '../../../../utils/loggers/server.mjs';

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      SpecialEvent.find({}).exec((err, knowledge) => {
        if (err) {
          logger.error({ err }, 'Error getting special events');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, events: knowledge });
          logger.info({ res }, 'Fetched special events');
          resolve();
        }
      });
    } else if (req.method === 'POST') {
      const data = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      logger.debug(data, 'req.body parsed');
      const newEvent = new SpecialEvent(req.body);
      newEvent.save((err, knowledge) => {
        if (err) {
          logger.error({ err }, 'Error saving special events');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, event: knowledge });
          logger.info({ res }, 'Saved special events');
          resolve();
        }
      });
    } else if (req.method === 'DELETE') {
      SpecialEvent.findOneAndDelete({ id: req.body.id }, (err, knowledge) => {
        if (err) {
          logger.error({ err }, 'Error deleting special events');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, event: knowledge });
          logger.info({ res }, 'Deleted special events');
          resolve();
        }
      });
    } else if (req.method === 'PUT') {
      const data = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      logger.debug(data, 'req.body parsed');
      SpecialEvent.findOneAndUpdate({ id: req.body.id },
        req.body, { new: true }, (err, knowledge) => {
          if (err) {
            logger.error({ err }, 'Error updating special events');
            res.status(500).send({ success: false, error: err });
            logger.info({ res });
            resolve();
          } else {
            res.send({ success: true, event: knowledge });
            logger.info({ res }, 'Updated special events');
            resolve();
          }
        });
    } else {
      logger.warn(`Wrong HTTP method on ${req.url}`);
      res.status(405).send({ success: false, error: `Wrong HTTP method on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
}
