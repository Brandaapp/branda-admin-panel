import dbConnect from '../../utils/dbConnect';
let Announcement = require('../../models/announcement');

dbConnect();

export default (req, res) => {
    if (req.method === 'POST') {
        let temp = new Announcement({
            title: req.body.title,
            content: req.body.content
        });
        temp.save((err, doc) => {
            if (err) {
                console.log("Error saving new announcement", err);
                res.sendStatus(500);
            } else res.send(doc);
        });
    } else {
        Announcement.find({ active: 1 }, (err, docs) => {
            if (err) {
                console.log("Error finding announcements", err);
                res.sendStatus(500);
            } else res.send(docs);
        });
    }
}