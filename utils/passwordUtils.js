import crypto from 'crypto';
import dbConnect from './dbConnect';
import User from '../models/User';

dbConnect();

export async function checkPassword(password, username) {
    const result = await User.findOne({ username: username }, 
        (error, user) => {
        if (error) {
            console.log("Error checking user credentials",error);
            return Promise.resolve(null);
        } else if (!user) {
            console.log("Could not find the specified user");
            return Promise.resolve(null);
        } else {
            return crypto.pbkdf2(password, user.salt, 25000, 512, 'sha256', (err, hash) => {
                if (err) {
                    console.log("Error hashing password",err);
                    return Promise.resolve(null);
                } else {
                    if (hash.toString('hex') === user.hash) {
                        return Promise.resolve(user);
                    } else {
                        console.log("Incorrect password");
                        return Promise.resolve(null);
                    }
                }
            });
        }
    });
    return result;
}