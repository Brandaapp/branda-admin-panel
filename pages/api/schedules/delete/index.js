import dbConnect from "../../../../utils/dbConnect";
import PlaceSchedule from "../../../../models/PlaceSchedule";

dbConnect();

export default function (req, res) {
    if (req.method === "PATCH") {
        PlaceSchedule.findOneAndUpdate({ emp_id: req.body.emp_id }, { active: 0 }).exec((err, doc) => {
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