import dbConnect from '../../../../../utils/dbConnect.mjs';

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            if (!req.query.name) {
                res.status(400).send('A name must be provided');
                resolve();
            }
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}