import dbConnect from "../../../../utils/dbConnect";
import News from "../../../../models/News";

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            News.find().exec((err, articles) => {
                if (err) {
                    res.status(500).send({err: err});
                    resolve();
                } else {
                    res.send({articles: articles});
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}