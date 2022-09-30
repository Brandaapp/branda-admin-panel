import dbConnect from '../../../../utils/dbConnect';
import Organization from '../../../../models/Organization';
import logger from '../../../../utils/loggers/server';

dbConnect();

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      Organization.find({ active: true }, (err, approvedOrganizations) => {
        if (err) {
          logger.error({ err }, 'Error fetching approved clubs');
          res.status(500).json({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.json({ success: true, approvedOrganizations: approvedOrganizations });
          logger.info({ res }, 'Fetched approved clubs');
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
