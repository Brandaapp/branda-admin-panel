import dbConnect from '../../../utils/dbConnect';
let PlaceSchedule = require('../../../models/PlaceSchedule');

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'POST') {
            const temp = new PlaceSchedule({
                emp_id: req.body.emp_id,
                Name: req.body.name,
                group: req.body.group,
                active: (req.body.active ? req.body.active : 1),
                weeks: (req.body.weeks ? req.body.weeks : []),
                monday: req.body.monday,
                tuesday: req.body.tuesday,
                wednesday: req.body.wednesday,
                thursday: req.body.thursday,
                friday: req.body.friday,
                saturday: req.body. saturday,
                sunday: req.body.sunday
            });
            temp.save((err, doc) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    res.send(doc);
                    resolve();
                }
            });
        } else if (req.method === 'GET') {
            PlaceSchedule.find({ active: 1 }, (err, docs) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    const places = docs.map(place => {
                        return { name: place.Name, group: place.group };
                    });
                    res.send(places);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be POST or GET on ${req.url}`);
            resolve();
        }
    });
}