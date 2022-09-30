import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { checkPassword } from '../../../utils/passwordUtils';
import dbConnect from '../../../utils/dbConnect';
import logger from '../../../utils/loggers/server';

const User = require('../../../models/User');

const options = {
  database: process.env.ADMIN_PANEL_DATABASE_URL,
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'text' }
      },
      authorize: async (credentials) => {
        await dbConnect();
        let result = null;
        await User.findOne({ username: credentials.username },
          (err, user) => {
            if (err) {
              logger.error('Error authenticating user');
              result = Promise.resolve(null);
            } else if (!user) {
              logger.warn('User not found');
              result = Promise.resolve(null);
            } else {
              if (checkPassword(credentials.password, user.salt, user.hash)) {
                logger.info({ credentials }, 'User authenticated');
                result = Promise.resolve(user);
              } else {
                logger.warn('Incorrect user credentials');
                result = Promise.resolve(null);
              }
            }
          });
        return result;
      }
    })
  ],
  secret: process.env.ADMIN_PANEL_SECRET,
  session: { jwt: true },
  jwt: { secret: process.env.ADMIN_PANEL_JWT_SECRET },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async (session, user) => {
      if (session) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.type = user.type;
        session.user.image = user.image;
      }
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = !!(user);
      if (isSignIn) {
        token.id = user._id;
        token.name = user.username;
        token.type = user.userType;
        token.image = user.picture;
      }
      return Promise.resolve(token);
    }
  }
};

export default (req, res) => NextAuth(req, res, options);
