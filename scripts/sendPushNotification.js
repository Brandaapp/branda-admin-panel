import axios from 'axios';
import Organization from '../models/Organization';
import logger from '../utils/loggers/server.mjs';

export function sendPushNotification (to, title, body, link) {
  return new Promise(resolve => {
    let memberCount;

    const response = {};

    Organization.findOneAndUpdate(
      { name: to },
      {
        $addToSet: {
          messagesSent: {
            title,
            message: body,
            date: new Date(),
            deliveredSuccessfully: true
          }
        },
        $inc: { messageNumber: 1 }
      }
    ).then(organization => {
      const { members, maxMessagesAllowed, messageNumber } = organization;
      if (messageNumber <= maxMessagesAllowed) {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        };

        const promises = [];
        members.forEach(member => {
          const data = {
            to: member,
            data: {
              link
            },
            title,
            body
          };

          // a bit weird, but should look like 'From: Test Notification Club', if sent from a specific club
          // if sent from general, it shouldn't display this
          if (to !== 'General') data.subtitle = `From: ${to}`;

          promises.push(
            axios.post('https://exp.host/--/api/v2/push/send', data, {
              headers
            })
          );
        });

        memberCount = members.length;

        Promise.allSettled(promises).then(results => {
          const errors = [];
          results.forEach(response => {
            if (response.value.status !== 200) {
              errors.push(response);
            }
          });

          const responseData = {
            total: memberCount,
            sent: memberCount - errors.length,
            errors
          };

          // logger.debug({ errors }, 'Errors sending push notifications');
          response.status = 200;
          response.send = responseData;
          logger.info('Sent push notifications');
          resolve(response);
        });
      } else {
        logger.warn('You have exceeded the max number of messages allowed');
        response.status = 412;
        response.send = {
          message: 'You have exceeded the max number of messages allowed'
        };
        logger.info({ response });
        resolve(response);
      }
    }).catch(err => {
      logger.error({ err }, 'Error getting organization to send notification to');
      response.status = 500;
      response.send = { err };
      resolve(response);
    });
  });
}
