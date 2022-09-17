import dbConnect from '../../../utils/dbConnect';
import DiningHours from '../../../models/DiningHours';

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            DiningHours.find({}).exec((err, doc) => {
                if (err) {
                    res.status(404).send({err: err});
                    resolve();
                } else {
                    res.send(doc);
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}