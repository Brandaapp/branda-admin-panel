import dbConnect from "../../../../utils/dbConnect";
import Organization from "../../../../models/Organization";

dbConnect();

export default function (req, res) {
  Organization.find({ active: true }, (err, approvedOrganizations) => {
    if (err) {
      res.json({ success: false, error: err });
    } else {
      console.log(approvedOrganizations);
      res.json({ success: true, approvedOrganizations: approvedOrganizations });
    }
  });
}
