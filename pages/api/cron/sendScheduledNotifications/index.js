import PushNotification from '../../../../models/PushNotification';
import logger from '../../../../utils/loggers/server.mjs';

// Used for determining date difference in promised time and sent time
import dayjs from 'dayjs';
import { sendPushNotification } from '../../../../scripts/sendPushNotification';

export default (req, res) => {
  return new Promise((resolve, reject) => {
    logger.info({ req });

    const sendingTime = dayjs().toDate();

    if (req.method === 'PATCH') {
      PushNotification.find({
        sendOn: {
          $lte: sendingTime
        }
      }).then(notifications => {
        const promises = [];
        const responses = [];
        notifications.forEach(notification => {
          const { to, title, body, link, sendOn } = notification;

          const promisedDifference = dayjs(sendingTime).diff(dayjs(sendOn));

          promises.push(
            sendPushNotification(to, title, body, link)
          );

          responses.push({
            notification,
            promisedDifference
          });
        });

        Promise.allSettled(promises).then(results => {
          results.forEach((response, index) => {
            responses[index].sent = response.value.status === 200;
          });

          PushNotification.deleteMany({
            sendOn: {
              $lte: sendingTime
            }
          }).then(() => {
            res.json(responses);
            logger.info({ res });
            resolve();
          }).catch(err => {
            logger.error({ err }, 'Error deleting push notification objects');
            res.status(500).send({ err });
            logger.info({ res });
            reject(err);
          });
        }).catch(err => {
          logger.error({ err }, 'Error settling all promises');
          res.status(500).send({ err });
          logger.info({ res });
          reject(err);
        });
      }).catch(err => {
        logger.error({ err }, 'Error fetching notifications to send');
        res.status(500).send({ err });
        logger.info({ res });
        reject(err);
      });
    } else {
      const error = `HTTP method must be PATCH on ${req.url}`;

      logger.warn(error);
      res.status(405).send(error);
      logger.info({ res });
      reject(new Error(error));
    }
  });
};
