import dbConnect from '../../../../utils/dbConnect';
let ShuttleActivity = require('../../../../models/ShuttleActivity');
const { DateTime } = require('luxon');

dbConnect();

export default (req, res) => {
    const { query: { date, id } } = req;
    const start = DateTime.fromISO(date).startOf('day').toJSDate();
    const end = DateTime.fromISO(date).endOf('day').toJSDate();
    if (req.method === 'DELETE') {
        ShuttleActivity.updateOne({ date: { $gte: start, $lte: end }, "times.ID": { $eq: id } },
            { $pull: { times: { ID: id } } },
            (err, result) => {
                if (err) {
                    console.log("Error removing shuttle route");
                    res.status(500).send("Oop");
                } else {
                    res.send(result);

                    //TODO: connect to samsara api
                }
            }
        );
    } else if (req.method === 'PATCH') {
        let info = {};
        if (req.body.start) info["times.$.start"] = req.body.start;
        if (req.body.end) info["times.$.end"] = req.body.end;
        if (req.body.busID) info["times.$.busID"] = req.body.busID;
        if (req.body.busName) info["times.$.busName"] = req.body.busName;
        if (req.body.route) info["times.$.route"] = req.body.route;
        ShuttleActivity.updateOne({ date: { $gte: start, $lte: end }, "times.ID": { $eq: id } },
            { $set: info },
            (err, result) => {
                if (err) {
                    console.log("Error updating bus route");
                    res.status(500).send("Oop");
                } else {
                    res.send(result);

                    //TODO: connect to samsara api
                }
            }
        );
    } else {
        ShuttleActivity.findOne({ date: { $gte: start, $lte: end }, "times.ID": { $eq: id } },
            (err, doc) => {
                if (err) {
                    console.log("Error finding shuttle route");
                    res.status(500).send("Oop");
                } else if (!doc) {
                    console.log("Could not find shuttle route");
                    res.status(404).send("Oop");
                } else {
                    const route = doc.times.find((element) => { return element.ID === id });
                    res.send(route);
                }
            }
        );
    }
}