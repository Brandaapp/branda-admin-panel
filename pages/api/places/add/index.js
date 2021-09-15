import dbConnect from "../../../../utils/dbConnect";
import Place from "../../../../models/Place";

dbConnect();

export default function (req, res) {
  if (req.method === "POST") {
    const newPlace = new Place({
      Name: req.body.name,
      group: req.body.group,
    });
    newPlace.save((err) => {
      if (err) {
        console.err(err);
      } else {
        res.send(newPlace);
      }
    });
  } else {
    res.status(405); // incorrect http request for this route
  }
}
