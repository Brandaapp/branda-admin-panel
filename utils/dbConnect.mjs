import mongoose from 'mongoose';
// import logger from './loggers/server.mjs';

const connection = {};

function dbConnect (dev = false) {
  if (connection.isConnected) {
    return Promise.resolve();
  }
  let uri = dev ? "mongodb://localhost:8080" : process.env.ADMIN_PANEL_DATABASE_URL
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(db => {
      connection.isConnected = db.connections[0].readyState;
      // logger.info('Mongoose successfully connected');
      resolve(db);
    }).catch(reject);
  });
}

export default dbConnect;
