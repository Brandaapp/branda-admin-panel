import dbConnect from "../../../../utils/dbConnect";
import Place from "../../../../models/Place";

dbConnect();

export default function (req, res) {
  if (req.method === "POST") {
    Place.create(
        {
          Name: req.body.name,
          group: req.body.group,
        },
        (err, doc) => {
          if (err) {
            console.err(err);
          } else {
            res.send(doc);
          }
        }
      );
  } else {
      res.status(405); // incorrect http request for this route
  }
}
