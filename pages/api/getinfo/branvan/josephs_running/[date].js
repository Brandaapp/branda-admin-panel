import JosephRunning from '../../../../../models/Joseph';
import moment from 'moment';
import logger from '../../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      const dateString = req.query.date;
      if (!dateString?.match(/\d{4}-\d{2}-\d{2}/)) {
        logger.warn('Valid date format not provided');
        res.status(400).send({ success: false, error: 'Valid date format not provided' });
        logger.info({ res });
        resolve();
      } else {
        JosephRunning.findOne({ date: moment(dateString).toDate() }, (err, running) => {
          if (err) {
            logger.error({ err }, 'Error fetching josephs shuttle');
            res.status(500).send({ sucess: false, error: err });
            resolve();
          } else {
            res.send({ success: true, running: !!running });
            logger.info({ res }, `Running status: ${!!running}`);
            resolve();
          }
        });
      }
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be GET on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
};
