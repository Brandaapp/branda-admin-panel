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
    } else if (req.method === 'POST') {
      const data = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      logger.debug(data, 'req.body parsed');
      const newKB = new KB(req.body);
      newKB.save((err, knowledge) => {
        if (err) {
          logger.error({ err }, 'Error saving knowledge');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, kb: knowledge });
          logger.info({ res }, 'Saved knowledge');
          resolve();
        }
      });
    } else if (req.method === 'DELETE') {
      KB.findOneAndDelete({ id: req.body.id }, (err, knowledge) => {
        if (err) {
          logger.error({ err }, 'Error deleting knowledge');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ success: true, kb: knowledge });
          logger.info({ res }, 'Deleted knowledge');
          resolve();
        }
      });
    } else if (req.method === 'PUT') {
      const data = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      logger.debug(data, 'req.body parsed');
      KB.findOneAndUpdate({ id: req.body.id },
        req.body, { new: true }, (err, knowledge) => {
          if (err) {
            logger.error({ err }, 'Error updating knowledge');
            res.status(500).send({ success: false, error: err });
            logger.info({ res });
            resolve();
          } else {
            res.send({ success: true, kb: knowledge });
            logger.info({ res }, 'Updated knowledge');
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
