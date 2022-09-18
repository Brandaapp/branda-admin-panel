import dbConnect from "../../../../utils/dbConnect";
import Organization from "../../../../models/Organization";

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'DELETE') {
            const { data: { organization_name, pushToken } } = 
                typeof req.body === "object" ? req.body : JSON.parse(req.body);
            Organization.findOneAndUpdate(
                {
                  name: organization_name
                },
                {
                  $pull: {
                    members: pushToken
                  }
                },
                { useFindAndModify: false },
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
            res.status(405).send(`HTTP method must be DELETE on ${req.url}`);
            resolve();
        }
    });
}