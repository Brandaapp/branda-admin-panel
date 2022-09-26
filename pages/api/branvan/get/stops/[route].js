import dbConnect from '../../../../../utils/dbConnect';
import ShuttleStop from '../../../../../models/ShuttleStop';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      const { query: { route } } = req;
      if (!route) {
        res.status(400).send('A route name must be provided');
      } else {
        ShuttleStop.find({ route }, (err, doc) => {
          if (err) {
            res.status(500).send(err);
          } else if (!doc) {
            res.status(404).send(`No shuttle found for route ${route}`);
          } else {
            res.status(200).send(doc);
          }
        });
      }
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
