import dbConnect from '../../../utils/dbConnect'
import { hashPassword } from '../../../utils/passwordUtils'
let User = require('../../../models/User')

dbConnect()

export default (req, res) => {
    return new Promise(resolve => {
        const { query: { id } } = req
        if (req.method === 'PATCH') {
            User.findById(id, (err, doc) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else if (!doc) {
                    res.status(404).send("Could not find user");
                    resolve();
                } else {
                    if (req.body.username) doc.username = req.body.username
                    if (req.body.email) doc.email = req.body.email
                    if (req.body.userType) doc.userType = req.body.userType
                    if (req.body.picture) doc.picture = req.body.picture
                    if (req.body.password) {
                        const [hash, salt] = hashPassword(req.body.password)
                        doc.salt = salt
                        doc.hash = hash
                    }
                    doc.save()
                    res.send(doc)
                    resolve();
                }
            })
        } else if (req.method === 'DELETE') {
            User.findByIdAndDelete(id, (err, doc) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else {
                    res.send(doc)
                    resolve();
                }
            })
        } else if (req.method === 'GET') {
            User.findById(id, (err, doc) => {
                if (err) {
                    res.status(500).send({ err });
                    resolve();
                } else if (!doc) {
                    res.status(404).send("Could not find user");
                    resolve();
                } else {
                    res.send(doc);
                    resolve();
                }
            })
        } else {
            res.status(405).send(`HTTP method must be PATCH, DELETE, or GET on ${req.url}`);
            resolve();
        }
    });
}