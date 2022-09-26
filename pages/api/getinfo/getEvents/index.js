import dbConnect from '../../../../utils/dbConnect';
import CalendarEvent from '../../../../models/CalendarEvent';
const _ = require('lodash');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      const year = req.query.year || false;
      const month = req.query.month || false;
      if (year && month) {
        CalendarEvent.find({ year: year, month: month }).exec((err, docs) => {
          if (err) {
            res.status(500).send({ err: err });
            resolve();
          } else {
            const objGrouping = _.groupBy(docs, 'dateForgroup');
            const arrFinalFormat = [];
            for (const date in objGrouping) {
              arrFinalFormat.push({ day: date, events: objGrouping[date] });
            }
            res.send(arrFinalFormat);
            resolve();
          }
        });
      } else {
        res.status(400).send({ err: 'no year or month' });
        resolve();
      }
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
