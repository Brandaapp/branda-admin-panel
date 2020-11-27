import dbConnect from '../../../utils/dbConnect';
let PlaceSchedule = require('../../../models/place-schedule');

dbConnect();

export default (req, res) => {
    PlaceSchedule.find({ active: 1 }, (err, docs) => {
        if (err) {
            console.log("Error finding schedules", err);
            res.sendStatus(500);
        } else {
            const { query: { week } } = req;
            let schedules = [];
            console.log("week: " + week);
            docs.forEach(place => {
                let weekInfo = place.weeks[week];
                schedules.push({
                    name: place.Name,
                    sunday: weekInfo.sunday,
                    saturday: weekInfo.saturday,
                    friday: weekInfo.friday,
                    thursday: weekInfo.thursday,
                    wednesday: weekInfo.wednesday,
                    tuesday: weekInfo.tuesday,
                    monday: weekInfo.monday
                });
            });
            res.json(schedules);
        }
    });
};