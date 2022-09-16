import dbConnect from "../../../../../utils/dbConnect";
import ShuttleStop from "../../../../../models/ShuttleStop";

dbConnect();

export default (req, res) => {
    return new Promise((resolve) => {
        if (req.method === 'GET') {
            ShuttleStop.find({}, (err, docs) => {
                if (err) {
                    res.status(500).send(err);
                    resolve();
                } else if (!docs) {
                    res.status(404).send('No shuttles found');
                    resolve();
                } else {
                    res.status(200).send(docs);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    })
}