import dbConnect from "../../../../utils/dbConnect";
import Place from "../../../../models/Place";

dbConnect();

export default function (req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "PATCH") {
      Place.findOneAndUpdate({ _id: req.body.id }, { active: 0 }).exec(
        (err, doc) => {
          if (err) {
            return reject(err);
          } else {
            res.send(doc);
            return resolve();
          }
        }
      );
    } else {
      return reject("Invalid HTTP request")
    }
  });
}
