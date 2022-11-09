import PushNotification from '../../../models/PushNotification';
import logger from '../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const scheduledNotification = new PushNotification({
        ...req.body
      });
      scheduledNotification.save((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error creating scheduled notification');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res });
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
