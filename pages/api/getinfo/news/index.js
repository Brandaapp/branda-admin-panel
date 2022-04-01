import dbConnect from "../../../../utils/dbConnect";
import News from "../../../../models/News";

dbConnect();

export default function(_req, res) {
    News.find().exec((err, articles) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send({ articles: articles });
        }
    });
}