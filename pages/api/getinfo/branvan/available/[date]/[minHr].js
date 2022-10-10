import Branvan from '../../../../../../models/BranvanTime';
import logger from '../../../../../../utils/loggers/server.mjs';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      Branvan.find({
        date: req.query.date,
        hour: {
          $gt: parseInt(req.query.minHr)
        }
      }).exec((err, slots) => {
        if (err) {
          logger.error({ err }, 'Error finding branvan availability');
          res.status(500).send({ success: false, error: err });
          logger.info({ res });
          resolve();
        } else {
          const hrs = {};
          const json = slots.map(x => x.toObject());
          for (const index in json) {
            const slot = json[index];
            const open = {};
            for (const stop in slot.stops) {
              if (slot.stops[stop].length < 20) {
                open[stop] = true;
              }
            }
            if (open) {
              hrs[`${slot.hour}:${slot.minute === 0 ? '00' : slot.minute}`] = open;
            }
          }
          logger.debug({ hrs }, 'hours computed');
          res.send({ sucess: true, hrs });
          logger.info({ res }, 'Hours availability fetched');
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
