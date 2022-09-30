import mongoose from 'mongoose';
import logger from './loggers/server';

const connection = {};

async function dbConnect () {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.ADMIN_PANEL_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  connection.isConnected = db.connections[0].readyState;

  logger.info('Mongoose successfully connected');
}

export default dbConnect;
