import Organization from '../../../../../models/Organization';
import logger from '../../../../../utils/loggers/server.mjs';

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      Organization.find({ active: true }, (err, approvedOrganizations) => {
        if (err) {
          logger.error({ err }, 'Error fetching active organizations');
          res.send({ success: false, error: err });
          resolve();
        } else {
          res.send({ success: true, approvedOrganizations: approvedOrganizations });
          logger.info({ approvedOrganizations }, 'Fetched active organization');
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
}
