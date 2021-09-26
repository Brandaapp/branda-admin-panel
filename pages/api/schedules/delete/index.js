import dbConnect from "../../../../utils/dbConnect";
import PlaceSchedule from "../../../../models/PlaceSchedule";

dbConnect();

export default function (req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "PATCH") {
      PlaceSchedule.findOneAndUpdate(
        { emp_id: req.body.emp_id },
        { active: 0 }
      ).exec((err, doc) => {
        if (err) {
          return reject(err);
        } else {
          res.send(doc);
          return resolve();
        }
      });
    } else {
      return reject("Invalid HTTP request");
    }
  });
}
