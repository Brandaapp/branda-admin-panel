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
        })
    }
}