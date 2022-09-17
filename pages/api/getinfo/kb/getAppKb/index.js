import dbConnect from '../../../../../utils/dbConnect';
import KB from '../../../../../models/KnowledgeBaseArticle';

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            KB.find().exec((err, knowledge) => {
                if (err) {
                    res.status(400).send({err: err});
                    resolve();
                } else {
                    res.send({kb: knowledge});
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}