import dbConnect from '../../../../utils/dbConnect';
let PlaceSchedule = require('../../../../models/PlaceSchedule');

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            PlaceSchedule.find({ active: 1 }, (err, docs) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    const { query: { week } } = req;
                    let schedules = [];
                    docs.forEach(place => {
                        if (place.weeks.length > week) {
                            let weekInfo = place.weeks[week];
                            schedules.push({
                                name: place.Name,
                                sunday: weekInfo.sunday,
                                saturday: weekInfo.saturday,
                                friday: weekInfo.friday,
                                thursday: weekInfo.thursday,
                                wednesday: weekInfo.wednesday,
                                tuesday: weekInfo.tuesday,
                                monday: weekInfo.monday,
                                emp_id: place.emp_id
                            });
                        }
                    });
                    res.send(schedules);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}