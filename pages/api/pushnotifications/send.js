import logger from '../../../utils/loggers/server.mjs';
import { sendPushNotification } from '../../../scripts/sendPushNotification.js';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const {
        to,
        title,
        message,
        link
      } = req.body;

      sendPushNotification(to, title, message, link)
        .then(response => {
          const { status, send } = response;
          res.status(status).send(send);
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
