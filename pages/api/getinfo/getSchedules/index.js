import dbConnect from "../../../../utils/dbConnect";
import PlaceSchedule from "../../../../models/PlaceSchedule";

dbConnect();

export default (req, res) => {
    PlaceSchedule.find({ active: 1 }).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
};