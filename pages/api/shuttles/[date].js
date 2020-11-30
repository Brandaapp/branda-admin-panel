import dbConnect from '../../../utils/dbConnect';
let ShuttleActivity = require('../../../models/shuttle-activity');
const { DateTime } = require('luxon');

dbConnect();

export default (req, res) => {
    const { query: { date } } = req;
    const start = DateTime.fromISO(date).startOf('day').toJSDate();
    const end = DateTime.fromISO(date).endOf('day').toJSDate();
    if (req.method === 'PATCH') {
        let temp = {
            start: req.body.start,
            end: req.body.end,
            busID: req.body.busID,
            busName: req.body.busName,
            route: req.body.route,
            ID: req.body.ID
        }
        /* 
            11/30/2020
            Note: MongoDB $ne query operator behaves in an unexpected way when used with arrays
            explanation here: 
            https://stackoverflow.com/questions/10907843/mongo-ne-query-with-an-array-not-working-as-expected/36484191
         */
        ShuttleActivity.update(
            { date: { $gte: start, $lte: end }, "times.ID": { $ne: req.body.ID } },
            { $addToSet: { times: temp } },
            (err, doc) => {
                if (err) {
                    console.log("Error adding shuttle");
                    res.sendStatus(500);
                } else {
                    res.send(doc);
                    
                    //TODO: connect to samsara api
                }
            }
        )
    } else {
        ShuttleActivity.findOne({
            date: {
                $gte: start,
                $lte: end
            }
        }, (err, doc) => {
            if (err) {
                console.log("Error finding date", err);
                res.sendStatus(500);
            } else if (!doc) {
                console.log("Could not find date");
                res.sendStatus(404);
            } else {
                res.send(doc);
            }
        });
    }
}