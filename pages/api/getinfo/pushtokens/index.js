import dbConnect from '../../../../utils/dbConnect';
import Organization from '../../../../models/Organization';

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'POST') {
      const { data } = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      const pushToken = data.pushToken;
      const organizationName = data.organization_name;
      Organization.findOneAndUpdate(
        {
          name: organizationName
        },
        {
          $addToSet: {
            members: pushToken
          }
        },
        { safe: true, upsert: true, useFindAndModify: false },
        (err, doc) => {
          if (err) {
            res.status(500).send({ err });
            resolve();
          } else {
            res.json({ organization: doc });
            resolve();
          }
        }
      );
    } else {
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      resolve();
    }
  });
};
