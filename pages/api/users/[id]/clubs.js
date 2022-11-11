import User from '../../../../models/User';
import logger from '../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      User.findOne({ _id: req.query.id })
        .then(user => {
          res.send(user.organizations);
          logger.info({ res });
          resolve();
        }).catch(err => {
          logger.error({ err }, 'Error finding user');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH, DELETE, or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
