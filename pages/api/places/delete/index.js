import Place from '../../../../models/Place';
import logger from '../../../../utils/loggers/server.mjs';

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'PATCH') {
      Place.findOneAndUpdate({ _id: req.body.id }, { active: 0 }).exec(
        (err, doc) => {
          if (err) {
            logger.error({ err }, 'Error patching place');
            res.status(500).send({ err });
            logger.info({ res });
            resolve();
          } else {
            res.send(doc);
            logger.info({ res }, 'Patched place to inactive');
            resolve();
          }
        }
      );
    } else {
      logger.warn(`HTTP method must be PATCH on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
}
