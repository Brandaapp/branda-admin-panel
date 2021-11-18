import dbConnect from "../../../../utils/dbConnect";
import BranvanNotif from "../../../../../models/Announcement";

dbConnect();

export default function (req, res) {
  BranvanNotif.find(
    {
      startTime: { $lte: moment().toDate() },
      endTime: { $gte: moment().toDate() },
    },
    (err, docs) => {
      if (err) {
        res.send({ empty: true });
      } else {
        if (docs.length === 0) {
          res.send({ empty: true });
        } else {
          res.send({
            empty: false,
            notifications: docs.map((doc) => {
              return {
                type: doc.type,
                content: doc.content,
                startTime: doc.startTime,
                endTime: doc.endTime,
              };
            }),
          });
        }
      }
    }
  );
}
