import Organization from '../../../../models/Organization';
import logger from '../../../../utils/loggers/server.mjs';

const filterDoc = doc => {
  const { name, active, members, messageNumber, maxMessagesAllowed, _id } = doc;
  return {
    name,
    active,
    members: members.length,
    messageNumber,
    maxMessagesAllowed,
    id: _id
  };
};

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'GET') {
      Organization.find({}, (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching clubs');
          res.statusCode = 500;
          res.end(JSON.stringify(err));
          logger.info({ res });
          resolve();
        } else {
          const result = [];

          docs.forEach((doc) => {
            if (doc.name) result.push(filterDoc(doc));
          });

          res.end(JSON.stringify(result));
          logger.info({ res }, 'Successfully fetched clubs');
          resolve();
        }
      });
    } else if (req.method === 'PATCH') {
      const options = req.body;
      Organization.findOneAndUpdate({ _id: options.id },
        options,
        { safe: true, upsert: true, useFindAndModify: false, new: true },
        (err, doc) => {
          if (err) {
            logger.error({ err }, 'Error updating club');
            res.status(500).send({ err });
            logger.info({ res });
            resolve();
          } else if (!doc) {
            logger.warn({ id: options.id }, 'Document not found for given id');
            res.status(404).send('No club with id in request body found');
            logger.info({ res });
            resolve();
          } else {
            res.send(filterDoc(doc));
            logger.info({ res }, 'Updated club');
            resolve();
          }
        });
    } else if (req.method === 'DELETE') {
      const id = req.body.id;
      Organization.findOneAndDelete({ _id: id }, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error deleting club');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn({ id }, 'Document not found for given id');
          res.status(404).send('No club with id in request body found');
          logger.info({ res });
          resolve();
        } else {
          res.send(filterDoc(doc));
          logger.info({ res }, 'Deleted club');
          resolve();
        }
      });
    } else if (req.method === 'POST') {
      // precondition: req.body contains all and only name, maxMessagesAllowed, active
      const club = new Organization({
        ...req.body
      });
      club.save((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error adding new club');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          res.send(filterDoc(doc));
          logger.info({ res }, 'Club created');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be GET, PATCH, or DELETE on ${req.url}`);
      res.status(405).send(`HTTP method must be GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
