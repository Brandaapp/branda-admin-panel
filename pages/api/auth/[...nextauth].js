import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { checkPassword } from '../../../utils/passwordUtils';
import dbConnect from '../../../utils/dbConnect';

let User = require('../../../models/User');

const options = {
    database: process.env.DATABASE_URL,
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "text" }
            },
            authorize: async (credentials) => {
                await dbConnect();
                let result = null;
                await User.findOne({ username: credentials.username }, 
                    (err, user) => {
                    if (err) {
                        console.log("Error checking user credentials",err);
                        result = Promise.resolve(null);
                    } else if (!user) {
                        console.log("Could not find the specified user");
                        result = Promise.resolve(null);
                    } else {
                        if (checkPassword(credentials.password, user.salt, user.hash)) {
                            result = Promise.resolve(user);
                        } else result = Promise.resolve(null);
                    }
                });
                return result;
            }
        })
    ],
    secret: process.env.SECRET,
    session: { jwt: true },
    jwt: { secret: "9D4F7DA9B5A707F03C88791DFADA6AF870633204E84C8E39F57760D60768E476" },
    pages: {
        signIn: '/login',
        signOut: '/login'
    }
}

export default (req, res) => NextAuth(req, res, options);