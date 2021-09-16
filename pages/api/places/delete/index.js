import dbConnect from "../../../../utils/dbConnect";
import Place from "../../../../models/Place";

dbConnect();

export default function (req, res) {
    if (req.method === "PATCH") {
        Place.findOneAndUpdate({ _id: req.body.id }, { active: 0 }).exec((err, doc) => {
            if (err) {
                res.status(400);
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(405);
    }
}