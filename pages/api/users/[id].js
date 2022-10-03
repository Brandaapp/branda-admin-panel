import dbConnect from '../../../utils/dbConnect';
import logger from '../../../utils/loggers/server.mjs';
import { hashPassword } from '../../../utils/passwordUtils';
const User = require('../../../models/User');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    const { query: { id } } = req;
    if (req.method === 'PATCH') {
      User.findById(id, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error finding user');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn('Could not find user');
          res.status(404).send('Could not find user');
          logger.info({ res });
          resolve();
        } else {
          if (req.body.username) doc.username = req.body.username;
          if (req.body.email) doc.email = req.body.email;
          if (req.body.userType) doc.userType = req.body.userType;
          if (req.body.picture) doc.picture = req.body.picture;
          if (req.body.password) {
            const [hash, salt] = hashPassword(req.body.password);
            doc.salt = salt;
            doc.hash = hash;
          }
          doc.save();
          res.send(doc);
          logger.info({ res }, 'Udated user');
          resolve();
        }
      });
    } else if (req.method === 'DELETE') {
      User.findByIdAndDelete(id, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error deleting user');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn('Could not find user');
          res.status(404).send('Could not find user');
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Deleted user');
          resolve();
        }
      });
    } else if (req.method === 'GET') {
      User.findById(id, (err, doc) => {
        if (err) {
          logger.error({ err }, 'Error fetching user');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else if (!doc) {
          logger.warn('Could not find user');
          res.status(404).send('Could not find user');
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Fetched user');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be PATCH, DELETE, or GET on ${req.url}`);
      res.status(405).send(`HTTP method must be PATCH, DELETE, or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
