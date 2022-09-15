import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.ADMIN_PANEL_DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    connection.isConnected = db.connections[0].readyState;

    console.log("Mongoose connection successful.");
}

export default dbConnect;