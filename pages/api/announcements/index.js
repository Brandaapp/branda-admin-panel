import { Mongoose } from 'mongoose';
import dbConnect from '../../../utils/dbConnect';
let Announcement = require('../../../models/announcement');

dbConnect();

//POST method
export default (req, res) => {
    let temp = new Announcement({
        _id: new Mongoose.Types.ObjectId(),
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        type: req.body.type,
        content: req.body.content
    });
    temp.save((err, doc) => {
        if (err) {
            console.log("Error saving new announcement", err);
            res.status(500).send("Oop");
        } else res.send(doc);
    });
}