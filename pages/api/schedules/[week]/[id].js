import dbConnect from '../../../../utils/dbConnect';
let PlaceSchedule = require('../../../../models/place-schedule');

dbConnect();

export default (req, res) => {
    const { query: { week, id } } = req;
    PlaceSchedule.findOne({ emp_id: id }, (err, doc) => {
        if (err) {
            console.log("Error finding schedule", err);
            res.sendStatus(500);
        } else if (!doc) {
            console.log("Could not find schedule");
            res.sendStatus(404);
        } else {
            res.send(doc.weeks[week]);
        }
    });
}