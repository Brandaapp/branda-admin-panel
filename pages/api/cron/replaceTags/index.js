import dbConnect from "../../../../utils/dbConnect";
const moment = require("moment");
const fetch = require("node-fetch");

dbConnect();

export default async function(_req, res) {
    console.log("EXECUTING REPLACE TAGS")
    let routesToUpdate = ["Campus", "Waltham", "Boston"]
    let tags = fetch('https://api.samsara.com/v1/tags?access_token=ANNHgBhJdUcAvq7DMg5Sts8cm3opfW')
        .then(response => response.json())
        .then((response) => { console.log(response); return response })
        .then(json => json.tags.map(tag => {
            return {
                id: tag.id,
                name: tag.name,
                groupId: tag.groupId
            }
        }).filter(tag => routesToUpdate.includes(tag.name)))
    console.log("TAGS", tags)

    let currentState = await shuttleActivity.findOne({
        date: {
            $gte: moment().startOf('day'),
            $lte: moment().endOf('day')
        }
    }).exec()

    // We're adding 1 minute here because there is otherwise an off-by-1 error
    let now = moment().add(1, "minute")

    let currentTags = currentState.times.filter(time => now >= time.start && now <= time.end)
    console.log("CURRENT TAGS", currentTags)
    x = await Promise.all(tags.map(tag => {
        console.log(currentTags.filter(item => item.route === tag.name).map(item => { return { id: item.busID } }))
        return fetch(`https://api.samsara.com/v1/tags/${tag.id}?access_token=ANNHgBhJdUcAvq7DMg5Sts8cm3opfW`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: tag.name,
                vehicles: currentTags.filter(item => item.route === tag.name).map(item => { return { id: item.busID } })
            })
        }).then(response => response.text())
    })).catch(e => res.status(500))
    console.log("RESULT", x)
    res.status(200);
};