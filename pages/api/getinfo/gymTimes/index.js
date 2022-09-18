import dbConnect from "../../../../utils/dbConnect";
import fetch from "node-fetch";
const moment = require("moment");

dbConnect();

const spaceIds = [ //tells us what ids to look for in the JSON file
    {
        name: "tennis-indoor",
        ids: [5, 6, 7]
    },
    {
        name: "tennis-outdoor",
        ids: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
    },
    {
        name: "pool",
        ids: [34],
    }
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getInfo = (doc) => {
    const info = []; //array that will eventually hold all of our JSON data
    const fall2021Excls = moment("2021-08-25");
    for (let i = 0; i < days.length; i++) { //loop through each day of the week finding when each space is open on that day
        const weekDay = { day: days[i], data: [] }; //each day has the spaces which themselves have the times at which they are open that day
        weekDay.date = moment().day(i);
        spaceIds.forEach(space => { //loop through each space and get the info for each
            const activity = { name: space.name }; //initialize the space
            const apiActivity = doc.data.filter(data => space.ids.includes(data.id));
            apiActivity.forEach(obj => {
                const day = obj.actual_open_hours[i];
                const start = moment().startOf("day").add(day.hours[0].start, "m");
                let end = moment().startOf("day").add(day.hours[0].end, "m");
                if (moment().isSameOrBefore(fall2021Excls)) {
                    end.hour(20);
                    end.minute(0);
                }
                activity["time" + day.day] = start.format("HH:mm:ss") + "-" + end.format("HH:mm:ss");
            });
            /*             for (let j = 0; j < space.ids.length; j++) { //for each of the ids associated with our space...
                            let id = space.ids[j];
                            for (let k = 0; k < doc.length; k++) { // ...look through each space in the doc to see if its id matches
                                let area = doc[k];
                                if (area.id === id) {
                                    let time = area.online_reservation_definition[i].summary[0]; //get this spaces hours for the current day of the week
                                    let hours = time.start + "-" + time.end;
                                    activity["time" + (j + 1)] = hours;
                                    k = doc.length; //exit the loop
                                }
                            }
                        } */
            weekDay.data.push(activity); //add the activity info to the array in our day object
        });
        info.push(weekDay); //add the day to our big array
    }
    //let output = JSON.stringify(info);
    //console.log(output);
    return info;
}

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'GET') {
            fetch('https://brandeis.dserec.com/online/fcscheduling/api/space')
            .then(response => response.json())
            .then(data => getInfo(data))
            .then(data => {
                res.send(data);
                resolve();
            });
        } else {
            res.status(405).send(`HTTP method must be GET on ${req.url}`);
            resolve();
        }
    });

}