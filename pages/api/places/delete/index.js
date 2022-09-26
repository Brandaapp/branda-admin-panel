import dbConnect from '../../../../utils/dbConnect';
import Place from '../../../../models/Place';

dbConnect();

export default function (req, res) {
  return new Promise(resolve => {
    if (req.method === 'PATCH') {
      Place.findOneAndUpdate({ _id: req.body.id }, { active: 0 }).exec(
        (err, doc) => {
          if (err) {
            res.status(500).send({ err });
            resolve();
          } else {
            res.send(doc);
            resolve();
          }
        }
      );
    } else {
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      resolve();
    }
  });
}
