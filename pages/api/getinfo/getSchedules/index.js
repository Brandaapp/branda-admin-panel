import dbConnect from "../../../../utils/dbConnect";
import PlaceSchedule from "../../../../models/PlaceSchedule";

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            PlaceSchedule.find({ active: 1 }).exec(function(err, doc) {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    res.send(doc);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
};