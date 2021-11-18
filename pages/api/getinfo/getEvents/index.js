import dbConnect from "../../../../utils/dbConnect";
const _ = require("lodash");
import CalendarEvent from "../../../../models/CalendarEvent";

dbConnect();

export default (req, res) => {
    let year = req.query.year || false;
    let month = req.query.month || false;

    if (year && month) {
        //add axios to helpers
        CalendarEvent.find({ year: year, month: month }).exec(function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                //prepare the view for the phone -  might be smarter to do front end
                let objGrouping = _.groupBy(docs, "dateForgroup");
                let arrFinalFormat = [];
                for (var date in objGrouping) {
                    //console.log(date);
                    arrFinalFormat.push({ day: date, events: objGrouping[date] });
                }

                //tmpArr.unshift({})
                //console.log("this is result after clean", arrFinalFormat)
                arrFinalFormat;
                res.send(arrFinalFormat);
            }
        });
    } else {
        res.send({ err: "no year or month" });
    }
}