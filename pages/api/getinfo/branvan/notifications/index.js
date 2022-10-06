import BranvanNotif from '../../../../../models/BranvanNotif';
import moment from 'moment';
import logger from '../../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      BranvanNotif.find(
        { startTime: { $lte: moment().toDate() }, endTime: { $gte: moment().toDate() } },
        (err, docs) => {
          if (err) {
            logger.error({ err }, 'Error fetching notifications');
            res.status(500).send({ err });
            resolve();
          } else if (!docs.length) {
            res.send({ empty: true });
            logger.info({ res }, 'No branvan notifications found');
            resolve();
          } else {
            res.send({
              empty: false,
              notifications: docs.map(doc => {
                return {
                  type: doc.type,
                  content: doc.content,
                  startTime: doc.startTime,
                  endTime: doc.endTime
                };
              })
            });
            logger.info({ res }, 'Fetched branvan notifications');
            resolve();
          }
        }
      );
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
