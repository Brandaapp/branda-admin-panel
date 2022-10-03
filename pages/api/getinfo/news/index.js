import dbConnect from '../../../../utils/dbConnect';
import News from '../../../../models/News';
import logger from '../../../../utils/loggers/server.mjs';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      News.find().exec((err, articles) => {
        if (err) {
          logger.error({ err }, 'Error fetching news articles');
          res.status(500).send({ err: err });
          logger.info({ res });
          resolve();
        } else {
          res.send({ articles: articles });
          logger.info({ res }, 'Fetched news articles');
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
