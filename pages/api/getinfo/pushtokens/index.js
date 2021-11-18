import dbConnect from "../../../../utils/dbConnect";
import Organization from "../../../../models/Organization";

dbConnect();

export default (req, res) => {
  Organization.findOneAndUpdate(
    {
      name: req.body.data.organization_name,
    },
    {
      $addToSet: {
        members: req.body.data.pushToken,
      },
    },
    { safe: true, upsert: true },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          organization: doc,
        });
      }
    }
  );
};
