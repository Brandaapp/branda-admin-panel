import dbConnect from "../../../../utils/dbConnect";
import Place from "../../../../models/Place";

dbConnect();

export default function (req, res) {
  return new Promise((resolve, _reject) => {
    if (req.method === "POST") {
      Place.findOne({ Name: req.body.name }, (err, doc) => {
        if (!doc) {
          // the place should not have been found
          const newPlace = new Place({
            Name: req.body.name,
            group: req.body.group,
          });
          newPlace.save((err) => {
            if (err) {
              console.err(err);
            } else {
              res.send(() => newPlace);
            }
          });
        } else {
          res.status(409).send(`${req.body.name} already exists`);
          return resolve();
        }
      });
    } else {
      res.status(405);
      return resolve();
    }
  });
}
