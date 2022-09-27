import dbConnect from '../../../utils/dbConnect';
import Organization from '../../../models/Organization';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      Organization.find({}, (err, docs) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify(err));
          resolve();
        } else {
          const result = [];

          docs.forEach((doc) => {
            const name = doc.name;
            if (name) {
              result.push({ name });
            }
          });

          res.end(JSON.stringify(result));
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
};
