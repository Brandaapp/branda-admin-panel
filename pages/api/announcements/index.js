import dbConnect from '../../../utils/dbConnect';
let mongoose = require('mongoose');
let Announcement = require('../../../models/Announcement');

dbConnect();

//POST method
export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'POST') {
            const temp = new Announcement({
                _id: new mongoose.Types.ObjectId(),
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                type: req.body.type,
                content: req.body.content
            });
            temp.save((err, doc) => {
                if (err) {
                    res.status(500).send("Oop");
                    resolve();
                } else {
                    res.send(doc);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be POST on ${req.url}`);
            resolve();
        }
    });
}