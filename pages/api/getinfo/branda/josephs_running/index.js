import dbConnect from "../../../../../utils/dbConnect";
import JosephsRunning from "../../../../../models/Joseph";
const moment = require("moment");

dbConnect();

export default (req, res) => {
    let dateString = req.query.date;
    if (!dateString.match(/\d{4}-\d{2}-\d{2}/)) {
        res.sendStatus(400);
        return;
    }

    JosephsRunning.findOne({ date: moment(dateString).toDate() }, (err, running) => {
        if (err) {
            res.status(400).send({ err: err });
        }
        res.send({ running: running !== null });
    });
}