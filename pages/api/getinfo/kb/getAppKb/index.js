import KB from '../../../../../models/KnowledgeBaseArticle';
import logger from '../../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      KB.find().exec((err, knowledge) => {
        if (err) {
          logger.error({ err }, 'Error getting knowledge');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, kb: knowledge });
          logger.info({ res }, 'Fetched knowledge');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET on ${req.url}`);
      res.status(405).send({ success: false, error: `HTTP method must be GET on ${req.url}` });
      logger.info({ res });
      resolve();
    }
  });
};
