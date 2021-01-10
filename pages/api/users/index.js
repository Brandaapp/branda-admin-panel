import dbConnect from '../../../utils/dbConnect'
import { hashPassword } from '../../../utils/passwordUtils'
let User = require('../../../models/User')

dbConnect()

export default (req, res) => {
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
                console.log("Error saving new user",err)
                res.status(500).send("Oop")
            } else res.send(doc)
        })
    } else {
        User.find({}, (err, docs) => {
            if (err) {
                console.log("Error getting users",err)
                res.status(500).send("Oop")
            } else {
                let users = docs.map(user => {
                    return { 
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        userType: user.userType
                    }
                })
                res.send(users)
            }
        })
    }
}