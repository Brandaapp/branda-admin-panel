import dbConnect from '../../../utils/dbConnect.mjs';
import logger from '../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    const { DB_ACCESS_TOKEN_SECRET } = process.env;
    const { db_access_token: DB_ACCESS_TOKEN } = req.headers;
    if (req.method === 'GET') {
      if (DB_ACCESS_TOKEN && DB_ACCESS_TOKEN === DB_ACCESS_TOKEN_SECRET) {
        dbConnect().then(db => {
          logger.debug({ db }, 'Database connection');
          res.send('Mongoose connection established');
          logger.info({ res }, 'Mongoose connection established');
          resolve();
        }).catch(err => {
          logger.error({ err }, 'Error establishing connection to db');
          res.status(500).send({ err, msg: 'Error establishing connection to db' });
          logger.info({ res });
          resolve();
        });
      } else {
        logger.warn(`Cannot turn on DB connection without an authorized token`);
        res.status(401).send(`Cannot turn on DB connection without an authorized token`);
        logger.info({ res });
        resolve();
      }
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
