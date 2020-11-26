import dbConnect from '../../../utils/dbConnect';
let PlaceSchedule = require('../../../models/PlaceSchedule');

dbConnect();

export default async (req, res) => {
    PlaceSchedule.find({ active: 1 }, (err, docs) => {
        if (err) {
            console.log("Error finding documents", err);
            res.sendStatus(500);
        } else {
            const { query: { week } } = req;
            let schedules = [];
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