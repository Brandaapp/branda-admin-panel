import Organization from '../../../../models/Organization';
import logger from '../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const { data } = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      logger.debug({ data }, 'req.body parsed');
      const pushToken = data.pushToken;
      const organizationName = data.organization_name;
      Organization.findOneAndUpdate(
        {
          name: organizationName
        },
        {
          $addToSet: {
            members: pushToken
          }
        },
        { safe: true, upsert: true, useFindAndModify: false },
        (err, doc) => {
          if (err) {
            logger.error({ err }, 'Error adding push token to organization');
            res.status(500).send({ err });
            logger.info({ res });
            resolve();
          } else {
            res.json({ organization: doc });
            logger.info({ res }, 'Pushed token to org');
            resolve();
          }
        }
      );
    } else {
      logger.warn(`HTTP method must be POST on ${req.url}`);
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
