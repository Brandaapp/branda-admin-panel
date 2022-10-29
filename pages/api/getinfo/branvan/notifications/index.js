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
            res.status(500).send({ success: false, error: err });
            resolve();
          } else {
            /*
            Not sending 404 for empty result because client codes are usually
            for displaying purpose, where diplaying an empty list is straitforward
            */
            res.send({
              success: true,
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
