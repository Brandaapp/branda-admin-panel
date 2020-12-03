import dbConnect from '../../../../utils/dbConnect';
let PlaceSchedule = require('../../../../models/place-schedule');

dbConnect();

export default (req, res) => {
    const { query: { week, id } } = req;
    PlaceSchedule.findOne({ emp_id: id }, (err, doc) => {
        if (err) {
            console.log("Error finding schedule", err);
            res.status(500).send("Oop");
        } else if (!doc) {
            console.log("Could not find schedule");
            res.status(404).send("Oop");
        } else {
            res.send(doc.weeks > week ? doc.weeks[week] : null);
        }
    });
}