import dbConnect from '../../../utils/dbConnect';
import logger from '../../../utils/loggers/server.mjs';
import { hashPassword } from '../../../utils/passwordUtils';
const User = require('../../../models/User');

dbConnect();

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const [hash, salt] = hashPassword(req.body.password);
      const temp = new User({
        username: req.body.username,
        email: req.body.email,
        userType: req.body.userType,
        picture: req.body.picture,
        salt: salt,
        hash: hash
      });
      temp.save((err, doc) => {
        if (err) {
          logger.error({ err }, 'Error creating user');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          res.send(doc);
          logger.info({ res }, 'Created user');
          resolve();
        }
      });
    } else if (req.method === 'GET') {
      User.find({}, (err, docs) => {
        if (err) {
          logger.error({ err }, 'Error fetching users');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
        } else {
          const users = docs.map(user => {
            return {
              _id: user._id,
              username: user.username,
              email: user.email,
              userType: user.userType
            };
          });
          res.send(users);
          logger.info({ res }, 'Users fetched');
          resolve();
        }
      });
    } else {
      logger.warn(`HTTP method must be POST or GET on ${req.url}`);
      res.status(405).send(`HTTP method must be POST or GET on ${req.url}`);
      logger.info({ res });
      resolve();
    }
  });
};
