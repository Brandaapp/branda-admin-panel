import dbConnect from "../../../../utils/dbConnect";
let PlaceSchedule = require("../../../../models/PlaceSchedule");

dbConnect();

export default (req, res) => {
  const {
    query: { week, name },
  } = req;
  if (req.method === "PATCH") {
    const weekInfo = {
      sunday: req.body.sunday,
      saturday: req.body.saturday,
      friday: req.body.friday,
      thursday: req.body.thursday,
      wednesday: req.body.wednesday,
      tuesday: req.body.tuesday,
      monday: req.body.monday,
      week: parseInt(week),
    };
    PlaceSchedule.updateOne(
      { Name: name },
      { $set: { [`weeks.${week}`]: weekInfo } },
      (err, result) => {
        if (err) {
          console.log("Error updating week", err);
          res.status(500).send("Oop");
        } else {
          res.send(result);
        }
      }
    );
  } else {
    PlaceSchedule.findOne({ Name: name }, (err, doc) => {
      if (err) {
        console.log("Error finding schedule", err);
        res.status(500).send("Oop");
      } else if (!doc) {
        console.log("Could not find schedule");
        res.status(404).send("Oop");
      } else {
        res.send(doc.weeks > week ? doc.weeks[week] : null);
      }
    });
  }
};
