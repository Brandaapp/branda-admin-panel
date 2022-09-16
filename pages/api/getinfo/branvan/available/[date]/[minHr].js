import dbConnect from "../../../../../../utils/dbConnect";
import Branvan from "../../../../../../models/BranvanTime";

dbConnect();

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            Branvan.find({
                date: req.query.date,
                hour: {
                    $gt: parseInt(req.query.minHr)
                }
            }).exec((err, slots) => {
                if (err) {
                    res.send({ err });
                    resolve();
                } else {
                    const hrs = {};
                    const json = slots.map(x => x.toObject());
                    for (const index in json) {
                        const slot = json[index];
                        const open = {};
                        for (const stop in slot.stops) {
                            if (slot.stops[stop].length < 20) {
                                open[stop] = true;
                            }
                        }
                        if (open) {
                            hrs[`${slot.hour}:${slot.minute === 0 ? "00" : slot.minute}`] = open;
                        }
                    }
                    res.send({ hrs });
                    resolve();
                }
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });
}