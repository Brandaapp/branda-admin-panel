import dbConnect from '../../../utils/dbConnect';
const Announcement = require('../../../models/Announcement');

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            const { query: { date } } = req;
            Announcement.find({ startTime: { $lte: date },
                endTime: { $gte: date } },
                (err, docs) => {
                if (err) {
                    res.status(500).send("Oop");
                    resolve();
                } else {
                    res.send(docs);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}