import logger from '../../../utils/loggers/server.mjs';
import axios from 'axios';
const Organization = require('../../../models/Organization');

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      let myArrayOfData = [];

      Organization.findOneAndUpdate(
      // we then want to go into thee DB and find the organization by name
      // should find the specific organization by name

        { name: req.body.organization_name },
        {
          $addToSet: {
          // we want to add to the array
            messagesSent: {
              title: req.body.title,
              message: req.body.message,
              link: req.body.httpLink,
              deliveredSuccessfully: true
            }
          },
          $inc: { messageNumber: 1 } // incerement the number of messages by 1
        }
      )
        .then((organizationModel) => {
        // then we get the organization back as an object
          myArrayOfData = organizationModel.members;

          return organizationModel;
        })
        .then((organizationModel) => {
        // here is where we are checking if the organization still is allowed to send notifications

          const maxMessagesAllowed = organizationModel.maxMessagesAllowed;
          const messageNumber = organizationModel.messageNumber;

          // test that only if max messages is > message sent .. it will send to people
          // var mainObject = {},
          if (messageNumber < maxMessagesAllowed) {
          /// if they can send a notification, then send it
            const headers = {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            };

            // to get link to open correctly, had to log out and then log in again on expo launched version of app

            const promises = [];
            myArrayOfData.forEach(function (singleElement, index) {
            // console.log(index);
              const userNumber = singleElement;
              const data = {
                to: userNumber,
                data: {
                  link: req.body.httpLink
                },
                title: req.body.title,
                body: req.body.message
              };

              promises.push(
                axios.post('https://exp.host/--/api/v2/push/send', data, {
                  headers: headers
                })
              );
            });

            Promise.all(promises).then(function (results) {
              const errors = [];
              results.forEach(function (response) {
              // mainObject[response.identifier] = response.value;
                if (response.status !== 200) {
                // res.status(500).send("Oop - error sending push notification");
                  errors.push(response);
                }
              });
              logger.debug({ errors }, 'Errors sending push notifications');
              res.status(200).send(errors).redirect('/'); // sending OK response
              logger.info({ res }, 'Sent push notifications');
              resolve();
            });
          } else {
          // otherwise send a response saying \/
            logger.warn('YOU HAVE EXCEEDED THE MAX NUMBER OF MESSAGES ALLOWED');
            res.status(412).json({
              message: 'YOU HAVE EXCEEDED THE MAX NUMBER OF MESSAGES ALLOWED'
            });
            logger.info({ res });
            resolve();
          }
        })
        .catch((err) => {
          logger.error({ err }, 'Error getting organization to send notification to');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        });
    } else {
      logger.warn(`HTTP method must be POST on ${req.url}`);
      res.status(405).send(`HTTP method must be POST on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
