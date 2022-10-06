import JSSoup from 'jssoup';
import DiningHours from '../../../../models/DiningHours';
import fetch, { FetchError } from 'node-fetch';
import logger from '../../../../utils/loggers/server.mjs';

const DINING_LINK = 'https://www.brandeishospitality.com/wp-admin/admin-ajax.php?action=nmc_dining_whats_open_data';

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
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

          logger.debug({ matchLocationsToHours }, 'internal hours array');

          DiningHours.collection.drop();
          DiningHours.create(
            { _id: 1, Dining: matchLocationsToHours },
            (err, doc) => {
              if (err) {
                logger.error({ err }, 'Problem creating new DiningHours document');
                res.status(500).send({ err, msg: 'Problem creating new DiningHours document' });
                logger.info({ res });
                resolve();
              } else {
                res.send(doc);
                logger.info({ res }, 'Dining hours updated');
                resolve();
              }
            }
          );
        })
        .catch(err => {
          if (err instanceof FetchError) {
            if (err.message.includes('getaddrinfo ENOTFOUND')) {
              // error from fetch() because of incorrect domain
              logger.error({ err }, 'Incorrect API domain');
              res.status(500).send({ err, msg: 'Incorrect API domain' });
              logger.info({ res });
              resolve();
            } else {
              logger.error({ err }, 'Could not fetch from external API');
              res.status(500).send({ err, msg: 'Could not fetch from external API' });
              logger.info({ res });
              resolve();
            }
          } else if (err instanceof Error) {
            logger.error({ err }, 'Could not fetch from external API');
            res.status(500).send({ err, msg: 'Could not fetch from external API' });
            logger.info({ res });
            resolve();
          } else {
            // !response.ok
            logger.error({ err }, 'Could not fetch from external API');
            res.status(err).send({ msg: 'Could not fetch from external API' });
            logger.info({ res });
            resolve();
          }
        });
    } else {
      logger.warn(`HTTP method must be PATCH on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
