import dbConnect from "../../../../utils/dbConnect";
let PlaceSchedule = require("../../../../models/PlaceSchedule");

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    const {
      query: { week, id },
    } = req;
    if (req.method === 'PATCH') {
      const weekInfo = {
        sunday: req.body.sunday,
        saturday: req.body.saturday,
        friday: req.body.friday,
        thursday: req.body.thursday,
        wednesday: req.body.wednesday,
        tuesday: req.body.tuesday,
        monday: req.body.monday,
        week: parseInt(week),
      };
      PlaceSchedule.updateOne(
        { emp_id: id },
        { $set: { [`weeks.${week}`]: weekInfo } },
        (err, result) => {
          if (err) {
            res.status(500).send({ err });
            resolve();
          } else {
            res.send(result);
            resolve();
          }
        }
      );
    } else if (req.method === 'GET') {
      PlaceSchedule.findOne({ emp_id: id }, (err, doc) => {
        if (err) {
          res.status(500).send({ err });
          resolve();
        } else if (!doc) {
          res.status(404).send("Could not find schedule");
          resolve();
        } else {
          res.send(doc.weeks > week ? doc.weeks[week] : null);
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be GET or PATCH on ${req.url}`);
      resolve();
    }
  });
};
