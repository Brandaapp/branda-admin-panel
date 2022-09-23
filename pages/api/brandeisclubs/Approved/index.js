import dbConnect from "../../../../utils/dbConnect";
import Organization from "../../../../models/Organization";

dbConnect();

export default function (req, res) {
  return new Promise(resolve => {
    if (req.method === 'GET') {
      Organization.find({ active: true }, (err, approvedOrganizations) => {
        if (err) {
          res.json({ success: false, error: err });
          resolve();
        } else {
          res.json({ success: true, approvedOrganizations: approvedOrganizations });
          resolve();
        }
      });
    } else {
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      resolve();
    }
  });
}
