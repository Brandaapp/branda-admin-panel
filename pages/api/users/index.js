import Organization from '../../../models/Organization.js';
import logger from '../../../utils/loggers/server.mjs';
import { hashPassword } from '../../../utils/passwordUtils';
const User = require('../../../models/User');

export default (req, res) => {
  return new Promise(resolve => {
    logger.info({ req });
    if (req.method === 'POST') {
      const [hash, salt] = hashPassword(req.body.password);

      Organization.find({})
        .then(organizations => {
          if (req.body.userType === 'manager') {
            req.body.organizations = organizations.map(organization => organization.name);
          }

          const temp = new User({
            ...req.body,
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
        }).catch(err => {
          logger.error({ err }, 'Error finding all organizations to check against user type');
          res.status(500).send({ err });
          logger.info({ res });
          resolve();
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
              userType: user.userType,
              organizations: user.organizations
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
