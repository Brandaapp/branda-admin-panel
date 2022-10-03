import dbConnect from '../../../../utils/dbConnect';
import Place from '../../../../models/Place';
import logger from '../../../../utils/loggers/server.mjs';

dbConnect();

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      Place.findOne({ Name: req.body.name }, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error finding place to verify nonexistence');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          // the place should not have been found
          const newPlace = new Place({
            Name: req.body.name,
            group: req.body.group
          });
          newPlace.save((err) => {
            if (err) {
              logger.error({ err }, 'Error saving new place');
              res.status(500).send({ err });
              logger.info({ res });
              resolve();
            } else {
              res.send(newPlace);
              logger.info({ res }, 'New place saved');
              resolve();
            }
          });
        } else {
          logger.warn(`${req.body.name} already exists`);
          res.status(409).send(`${req.body.name} already exists`);
          logger.info({ res });
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be POST on ${req.url}`);
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
}
