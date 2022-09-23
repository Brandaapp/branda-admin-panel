import dbConnect from "../../../../utils/dbConnect";
import PlaceSchedule from "../../../../models/PlaceSchedule";

dbConnect();

export default function (req, res) {
  return new Promise(resolve => {
    if (req.method === 'PATCH') {
      PlaceSchedule.findOneAndUpdate(
        { emp_id: req.body.emp_id },
        { active: 0 }
      ).exec((err, doc) => {
        if (err) {
          res.status(500).send({ err });
          resolve();
        } else {
          res.send(doc);
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      resolve();
    }
  });
}
