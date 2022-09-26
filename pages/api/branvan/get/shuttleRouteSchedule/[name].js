import dbConnect from '../../../../../utils/dbConnect.mjs';
import ShuttleRouteSchedule from '../../../../../models/ShuttleRouteSchedule';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      const name = req.query.name;
      ShuttleRouteSchedule.find({ name }, (err, doc) => {
        if (err) {
          res.status(500).send({ err });
          resolve();
        } else if (!doc) {
          res.status(404).send(`Could not find a schedule for route with name ${name}`);
          resolve();
        } else {
          res.send(doc);
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
