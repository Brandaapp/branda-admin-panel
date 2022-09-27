import dbConnect from '../../../../utils/dbConnect';
import fetch from 'node-fetch';
import shuttleActivity from '../../../../models/ShuttleActivity';
const moment = require('moment');

dbConnect();

export default function (req, res) {
  return new Promise((resolve) => {
    if (req.method === 'PATCH') {
      const routesToUpdate = ['Campus', 'Waltham', 'Boston'];
      fetch(`https://api.samsara.com/v1/tags?access_token=${process.env.SAMSARA_API_KEY}`)
        .then(response => response.json())
        .then(json => json.tags.map(tag => {
          return {
            id: tag.id,
            name: tag.name,
            groupId: tag.groupId
          };
        }))
        .then(tags => tags.filter(tag => routesToUpdate.includes(tag.name)))
        .then(tags => {
          shuttleActivity.findOne({
            date: {
              $gte: moment().startOf('day'),
              $lte: moment().endOf('day')
            }
          }).exec()
            .then(currentState => {
              if (currentState) {
                // We're adding 1 minute here because there is otherwise an off-by-1 error
                const now = moment().add(1, 'minute');

                const currentTags = currentState.times.filter(time => now >= time.start && now <= time.end);

                Promise.all(tags.map(async tag => {
                  const response =
                  await fetch(`https://api.samsara.com/v1/tags/${tag.id}?access_token=${process.env.SAMSARA_API_KEY}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      name: tag.name,
                      vehicles: currentTags.filter(item => item.route === tag.name).map(item1 => {
                        return {
                          id: item1.busID
                        };
                      })
                    })
                  });
                  const text = await response.text();
                  return text;
                })).catch(err => {
                  res.status(500).send({ err });
                  resolve();
                }).then(() => {
                  res.status(200).send({});
                  resolve();
                });
              } else {
                res.status(200).send('No shuttle activity found');
                resolve();
              }
            });
        });
    } else {
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      resolve();
    }
  });
}
