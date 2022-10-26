import logger from '../../../../../utils/loggers/server';
const BranvanNotif = require('../../../../../models/BranvanNotif');

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      const { query: { date } } = req;
      BranvanNotif.find({ startTime: { $lte: date },
        endTime: { $gte: date } },
      (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching Branvan notifications');
          res.status(500).send({ success: false, error: err });
          resolve();
        } else if (!docs.length) {
          logger.warn(`Could not find a Branvan notification at ${date}`);
          res.status(404).send({ success: false, error: `Could not find a Branvan notification at ${date}` });
          resolve();
        } else {
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
          logger.info({ res }, 'Branvan notifications fetched');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be GET on ${req.url}` });
      logger.info(res);
      resolve();
    }
  });
};
