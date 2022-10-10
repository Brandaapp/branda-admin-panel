import Organization from '../../../../models/Organization';
import logger from '../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'DELETE') {
      const { data } = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      logger.debug({ data }, 'Data loaded for push token delete');
      const pushToken = data.pushToken;
      const organizationName = data.organization_name;
      Organization.findOneAndUpdate(
        {
          name: organizationName
        },
        {
          $pull: {
            members: pushToken
          }
        },
        { useFindAndModify: false },
        (err, doc) => {
          if (err) {
            logger.error({ err }, 'Error deleting push token');
            res.status(500).send({ success: false, error: err });
            logger.info({ res });
            resolve();
          } else {
            res.json({ success: true, organization: doc });
            logger.info({ res }, 'Deleted push token');
            resolve();
          }
        }
      );
    } else {
      logger.warn(`HTTP method must be DELETE on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be DELETE on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
};
