import dbConnect from '../../../utils/dbConnect'
let Organization = require('../../../models/Organization')

dbConnect()

export default (req, res) => {
  if (req.method === "POST") {
    Organization.findOneAndUpdate(
      {
        name: req.body.data.organization_name
      },
      {
        $addToSet: {
          members: req.body.data.pushToken
        }
      },
      { safe: true, upsert: true },
      (err, doc) => {
        if (err) {
          res.status(500).send("Oop")
          console.log(err);
        } else {
          res.json({
            organization: doc
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    Organization.findOneAndUpdate(
      {
        name: req.body.organization_name
        /// here we are using req.body  in the front end code it is req.body.data.organization_name   need to keep that in mind
      },
      {
        $pull: {
          members: req.body.pushToken
          /// here we are using req.body  in the front end code it is req.body.data.pushToken   need to keep that in mind
        }
      },
      // { safe: true, upsert: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            organization: doc
          });
        }
      }
    );
  }
}