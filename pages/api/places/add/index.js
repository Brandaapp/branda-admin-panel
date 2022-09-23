import dbConnect from "../../../../utils/dbConnect";
import Place from "../../../../models/Place";

dbConnect();

export default function (req, res) {
  return new Promise(resolve => {
    if (req.method === "POST") {
      Place.findOne({ Name: req.body.name }, (err, doc) => {
        if (err) {
          res.status(500).send({ err });
          resolve();
        } else if (!doc) {
          // the place should not have been found
          const newPlace = new Place({
            Name: req.body.name,
            group: req.body.group,
          });
          newPlace.save((err) => {
            if (err) {
              res.status(500).send({ err });
              resolve();
            } else {
              res.send(newPlace);
              resolve();
            }
          });
        } else {
          res.status(409).send(`${req.body.name} already exists`);
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      resolve();
    }
  });
}
