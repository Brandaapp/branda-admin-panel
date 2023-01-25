import PushNotification from '../../../../../models/PushNotification';
import { sendPushNotification } from '../../../../../scripts/sendPushNotification.js';
import logger from '../../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const { id } = req.query;
      PushNotification.findById(id)
        .then(doc => {
          const {
            to,
            title,
            body,
            link
          } = doc;
          return sendPushNotification(to, title, body, link);
        }).then(() => {
          return PushNotification.findByIdAndDelete(id);
        }).then(doc => {
          res.send(doc);
          logger.info({ res }, 'Push notification deleted');
          resolve();
        })
        .catch(err => {
          logger.error({ err }, 'Error sending push notification early');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        });
    } else {
      logger.warn(`HTTP method must be POST on ${req.url}`);
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
