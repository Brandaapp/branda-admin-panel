import logger from '../../../../../utils/loggers/server.mjs';
import PushNotification from '../../../../../models/PushNotification';

// DELETE route
export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'DELETE') {
      const { id } = req.query;
      PushNotification.findByIdAndDelete(id)
        .then(doc => {
          res.send(doc);
          logger.info({ res }, 'Push notification deleted');
          resolve();
        })
        .catch(err => {
          logger.error({ err }, 'Error deleting push notification');
          res.status(500).semd({ err });
          logger.info({ res });
          resolve();
        });
    } else {
      logger.warn(`HTTP method must be DELETE on ${req.url}`);
      res.status(405).send(`HTTP method must be DELETE on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
