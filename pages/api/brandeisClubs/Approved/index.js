import dbConnect from '../../../../utils/dbConnect';
import Organization from '../../../../models/Organization';

dbConnect();

export default (req, res) => {
    return new Promise((resolve, reject) => {
        Organization.find({}, (err, docs) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify(err));
                resolve();
            } else {
                res.statusCode = 200;
                res.end(JSON.stringify(docs));
                return resolve();
            }
        })
    })
}