import dbConnect from "../../../../utils/dbConnect";

dbConnect();

export default function (_req, res) {
  News.find().exec((err, articles) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ articles: articles });
    }
  });
}
