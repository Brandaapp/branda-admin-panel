import JSSoup from 'jssoup';
import DiningHours from '../../../../models/DiningHours';
import fetch, { FetchError } from 'node-fetch';
import dbConnect from '../../../../utils/dbConnect.mjs';

dbConnect();

const DINING_LINK = 'https://www.brandeishospitality.com/wp-admin/admin-ajax.php?action=nmc_dining_whats_open_data';

export default (req, res) => {
  return new Promise(resolve => {
    if (req.method === 'PATCH') {
      fetch(DINING_LINK)
        .then(response => {
          if (!response.ok) {
            throw response.status;
          } else {
            return response.text();
          }
        })
        .then(textResponse => {
          const parsed = new JSSoup(textResponse, false);

          const locations = [];
          let openTime = '';
          const times = [];
          const matchLocationsToHours = {};

          for (const place of parsed.findAll('a')) {
            locations.push(place.text.replaceAll(/[^a-zA-Z\s]/g, '').replaceAll('amp', '&'));
          }

          for (const hour of parsed.findAll('span')) {
            const temp = hour.parent;
            if (temp.attrs['data-name'] === 'Breakfast') {
              if (hour.attrs.class === 'hour open_at') {
                openTime = hour.text;
              }
            } else if (temp.attrs['data-name'] === 'Dinner') {
              if (hour.attrs.class === 'hour close_at') {
                times.push({ 'Open': openTime, 'Close': hour.text });
              }
            } else if (temp.attrs['data-name'] === 'Open') {
              if (hour.attrs.class === 'hour open_at') {
                openTime = hour.text;
              } else if (hour.attrs.class === 'hour close_at') {
                times.push({ 'Open': openTime, 'Close': hour.text });
              }
            } else if (temp.attrs['data-name'] === 'Fall 2022 WW') {
              if (hour.attrs.class === 'hour open_at') {
                openTime = hour.text;
              } else if (hour.attrs.class === 'hour close_at') {
                times.push({ 'Open': openTime, 'Close': hour.text });
              }
            }
          }

          for (let i = 0; i < locations.length; i++) {
            matchLocationsToHours[locations[i]] = times[i];
          }

          DiningHours.collection.drop();
          DiningHours.create(
            { _id: 1, Dining: matchLocationsToHours },
            (err, doc) => {
              if (err) {
                res.status(500).send({ err, msg: 'Problem creating new DiningHours document' });
                resolve();
              } else {
                res.send(doc);
                resolve();
              }
            }
          );
        })
        .catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              res.status(500).send({ err, msg: 'Incorrect API domain' });
              resolve();
            } else {
              res.status(500).send({ err, msg: 'Could not fetch from external API' });
              resolve();
            }
          } else if (err instanceof Error) {
            res.status(500).send({ err, msg: 'Could not fetch from external API' });
            resolve();
          } else {
            // !response.ok
            res.status(err).send({ msg: 'Could not fetch from external API' });
            resolve();
          }
        });
    } else {
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      resolve();
    }
  });
};
