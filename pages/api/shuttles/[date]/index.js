import dbConnect from '../../../../utils/dbConnect';
const ShuttleActivity = require('../../../../models/ShuttleActivity');
const { DateTime } = require('luxon');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    const { query: { date } } = req;
    const start = DateTime.fromISO(date).startOf('day').toJSDate();
    const end = DateTime.fromISO(date).endOf('day').toJSDate();
    if (req.method === 'PATCH') {
      const temp = {
        start: req.body.start,
        end: req.body.end,
        busID: req.body.busID,
        busName: req.body.busName,
        route: req.body.route,
        ID: req.body.ID
      };
      /*
            11/30/2020
            Note: MongoDB $ne query operator behaves in an unexpected way when used with arrays
            explanation here:
            https://stackoverflow.com/questions/10907843/mongo-ne-query-with-an-array-not-working-as-expected/36484191
         */
      ShuttleActivity.updateOne(
        { date: { $gte: start, $lte: end }, 'times.ID': { $ne: req.body.ID } },
        { $addToSet: { times: temp } },
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
            resolve();
          } else {
            res.send(result);
            resolve();
            // TODO: connect to samsara api
          }
        }
      );
    } else if (req.method === 'GET') {
      ShuttleActivity.findOne({
        date: {
          $gte: start,
          $lte: end
        }
      }, (err, doc) => {
        if (err) {
          res.status(500).send({ err });
          resolve();
        } else if (!doc) {
          res.status(404).send('Could not find date');
          resolve();
        } else {
          res.send(doc);
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be PATCH or GET on ${req.url}`);
      resolve();
    }
  });
};
