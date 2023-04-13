import mongoose from 'mongoose';
import logger from './loggers/server.mjs';

const connection = {};

function dbConnect () {
  if (connection.isConnected) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.ADMIN_PANEL_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(db => {
      connection.isConnected = db.connections[0].readyState;
      logger.info('Mongoose successfully connected');
      resolve(db);
    }).catch(reject);
  });
}

export default dbConnect;
