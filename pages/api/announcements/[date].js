import dbConnect from '../../../utils/dbConnect';
let Announcement = require('../../../models/Announcement');

dbConnect();

export default (req, res) => {
    const { query: { date } } = req;
    Announcement.find({ startTime: { $lte: date },
        endTime: { $gte: date } },
        (err, docs) => {
        if (err) {
            console.log("Error finding announcements", err);
            res.status(500).send("Oop");
        } else res.send(docs);
    });
}