import dbConnect from '../../../../../utils/dbConnect';
import BranvanNotif from '../../../../../models/BranvanNotif';
import moment from 'moment';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      BranvanNotif.find(
        { startTime: { $lte: moment().toDate() }, endTime: { $gte: moment().toDate() } },
        (err, docs) => {
          if (err) {
            res.send({ empty: true });
            resolve();
          } else {
            res.send({
              empty: false,
              notifications: docs.map(doc => {
                return {
                  type: doc.type,
                  content: doc.content,
                  startTime: doc.startTime,
                  endTime: doc.endTime
                };
              })
            });
            resolve();
          }
        }
      );
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
