import fetch from 'node-fetch';
import shuttleActivity from '../../../../models/ShuttleActivity';
import logger from '../../../../utils/loggers/server.mjs';
const moment = require('moment');

export default function (req, res) {
  return new Promise(resolve => {
    logger.info({ req });
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
          logger.debug({ tags }, 'Tags being updated');
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
                logger.debug({ currentTags }, 'Current tags');

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
                  logger.debug({ text }, 'Text from samsara response');
                  return text;
                })).then(() => {
                  res.status(200).send({});
                  logger.info({ res }, 'Replaced tags');
                  resolve();
                }).catch(err => {
                  logger.error({ err }, 'Error replacing tags');
                  res.status(500).send({ err });
                  logger.info({ res });
                  resolve();
                });
              } else {
                logger.warn('No shuttle activity found');
                res.status(200).send('No shuttle activity found');
                logger.info({ res });
                resolve();
              }
            });
        });
    } else {
      logger.warn(`HTTP method must be PATCH on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
}
