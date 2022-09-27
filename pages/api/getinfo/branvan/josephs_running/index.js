import dbConnect from '../../../../../utils/dbConnect';
import JosephRunning from '../../../../../models/Joseph';
import moment from 'moment';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      const dateString = req.query.date;
      if (!dateString.match(/\d{4}-\d{2}-\d{2}/)) {
        res.status(400).send({ err: true });
        resolve();
      } else {
        JosephRunning.findOne({ date: moment(dateString).toDate() }, (err, running) => {
          if (err) {
            res.status(400).send({ err });
            resolve();
          } else {
            res.send({ running: !!running });
            resolve();
          }
        });
      }
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
