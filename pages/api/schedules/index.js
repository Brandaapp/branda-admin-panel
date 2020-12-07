import dbConnect from '../../../utils/dbConnect';
let PlaceSchedule = require('../../../models/PlaceSchedule');

dbConnect();

export default (req, res) => {
    if (req.method === 'POST') {
        let temp = new PlaceSchedule({
            emp_id: req.body.emp_id,
            Name: req.body.name,
            group: req.body.group,
            active: (req.body.active ? req.body.active : 1),
            weeks: (req.body.weeks ? req.body.weeks : [])
        });
        temp.save((err, doc) => {
            if (err) {
                console.log("Error saving new place");
                res.status(500).send("Oop");
            } else res.send(doc);
        });
    } else {
        PlaceSchedule.find({ active: 1 }, (err, docs) => {
            if (err) {
                console.log("Error getting places", err);
                res.status(500).send("Oop");
            } else {
                let places = docs.map(place => {
                    return { name: place.Name, group: place.group };
                });
                res.send(places);
            }
        });
    }
}