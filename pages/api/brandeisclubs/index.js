import Organization from '../../../models/Organization';
import logger from '../../../utils/loggers/server';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      Organization.find({}, (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching clubs');
          res.statusCode = 500;
          res.end(JSON.stringify(err));
          logger.info({ res });
          resolve();
        } else {
          const result = [];

          docs.forEach((doc) => {
            const name = doc.name;
            if (name) {
              result.push({ name });
            }
          });

          res.end(JSON.stringify(result));
          logger.info({ res }, 'Successfully fetched clubs');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
