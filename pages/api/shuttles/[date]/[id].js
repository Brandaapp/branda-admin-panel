import dbConnect from '../../../../utils/dbConnect';
const ShuttleActivity = require('../../../../models/ShuttleActivity');
const { DateTime } = require('luxon');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    const { query: { date, id } } = req;
    const start = DateTime.fromISO(date).startOf('day').toJSDate();
    const end = DateTime.fromISO(date).endOf('day').toJSDate();
    if (req.method === 'DELETE') {
      ShuttleActivity.updateOne({ date: { $gte: start, $lte: end }, 'times.ID': { $eq: id } },
        { $pull: { times: { ID: id } } },
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
    } else if (req.method === 'PATCH') {
      const info = {};
      if (req.body.start) info['times.$.start'] = req.body.start;
      if (req.body.end) info['times.$.end'] = req.body.end;
      if (req.body.busID) info['times.$.busID'] = req.body.busID;
      if (req.body.busName) info['times.$.busName'] = req.body.busName;
      if (req.body.route) info['times.$.route'] = req.body.route;
      ShuttleActivity.updateOne({ date: { $gte: start, $lte: end }, 'times.ID': { $eq: id } },
        { $set: info },
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
      ShuttleActivity.findOne({ date: { $gte: start, $lte: end }, 'times.ID': { $eq: id } },
        (err, doc) => {
          if (err) {
            res.status(500).send({ err });
            resolve();
          } else if (!doc) {
            res.status(404).send('Could not find shuttle activity');
            resolve();
          } else {
            const route = doc.times.find((element) => { return element.ID === id; });
            res.send(route);
            resolve();
          }
        }
      );
    } else {
      res.status(405).send(`HTTP method must be DELETE, PATCH, or GET on ${req.url}`);
      resolve();
    }
  });
};
