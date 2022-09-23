import dbConnect from '../../../utils/dbConnect'
import { hashPassword } from '../../../utils/passwordUtils'
let User = require('../../../models/User')

dbConnect()

export default (req, res) => {
    return new Promise(resolve => {
        if (req.method === 'POST') {
            const [hash, salt] = hashPassword(req.body.password)
            let temp = new User({
                username: req.body.username,
                email: req.body.email,
                userType: req.body.userType,
                picture: req.body.picture,
                salt: salt,
                hash: hash
            })
            temp.save((err, doc) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    res.send(doc);
                    resolve();
                }
            })
        } else if (req.method === 'GET') {
            User.find({}, (err, docs) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    let users = docs.map(user => {
                        return { 
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            userType: user.userType
                        }
                    })
                    res.send(users);
                    resolve();
                }
            })
        } else {
            res.status(405).send(`HTTP method must be POST or GET on ${req.url}`);
            resolve();
        }
    });
}