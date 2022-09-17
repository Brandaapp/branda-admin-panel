import dbConnect from "../../../../utils/dbConnect";
const moment = require("moment");
import fetch from "node-fetch";
import shuttleActivity from "../../../../models/ShuttleActivity";

dbConnect();

export default function(req, res) {
    return new Promise(async (resolve) => {
        if (req.method === 'PATCH') {
            const routesToUpdate = ["Campus", "Waltham", "Boston"];
            const tags = await fetch(`https://api.samsara.com/v1/tags?access_token=${process.env.SAMSARA_API_KEY}`)
                .then(response => response.json())
                .then(json => json.tags.map(tag => {
                    return {
                        id: tag.id,
                        name: tag.name,
                        groupId: tag.groupId
                    }
                }))
                .then(tags => tags.filter(tag => routesToUpdate.includes(tag.name)));

            const currentState = await shuttleActivity.findOne({
                date: {
                    $gte: moment().startOf('day'),
                    $lte: moment().endOf('day')
                }
            }).exec();

            // We're adding 1 minute here because there is otherwise an off-by-1 error
            if (!!currentState) {
                const now = moment().add(1, "minute");

                const currentTags = currentState.times.filter(time => now >= time.start && now <= time.end);
                
                const x = await Promise.all(tags.map(async tag => {
                    const response = await fetch(`https://api.samsara.com/v1/tags/${tag.id}?access_token=${process.env.SAMSARA_API_KEY}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: tag.name,
                            vehicles: currentTags.filter(item => item.route === tag.name).map(item_1 => {
                                return {
                                    id: item_1.busID
                                };
                            })
                        })
                    });
                    return await response.text();
                })).catch(err => res.status(500).send({ err }))
                
                res.status(200).send({});
                resolve();
            } else {
                res.status(200).send("No shuttle activity found");
                resolve();
            }
        } else {
            res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
            resolve();
        }
    })
};