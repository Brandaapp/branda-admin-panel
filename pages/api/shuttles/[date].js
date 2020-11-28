import dbConnect from '../../../utils/dbConnect';
let ShuttleActivity = require('../../../models/shuttle-activity');
const { DateTime } = require('luxon');

dbConnect();

export default (req,res) => {
    const { query: { date } } = req;
    const day = DateTime.fromISO(date);
    ShuttleActivity.findOne({ 
        date: { 
            $gte: day.startOf('day').toJSDate(), 
            $lte: day.endOf('day').toJSDate()
        } 
    }, (err,doc) => {
        if (err) {
            console.log("Error finding date",err);
            res.sendStatus(500);
        } else if (!doc) {
            console.log("Could not find date");
            res.sendStatus(404);
        } else {
            res.send(doc);
        }
    });
}