import dbConnect from '../../../utils/dbConnect'
import { hashPassword } from '../../../utils/passwordUtils'
let User = require('../../../models/User')

dbConnect()

export default (req, res) => {
    const { query: { id } } = req
    if (req.method === 'PATCH') {
        User.findById(id, (err, doc) => {
            if (err) {
                console.log("Error finding user",err)
                res.status(500).send("Oop")
            } else if (!doc) {
                console.log("Could not find user")
                res.status(404).send("Oop")
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
            }
        })
    } else if (req.method === 'DELETE') {
        User.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                console.log("Error deleting user",err)
                res.status(500).send("Oop")
            } else {
                res.send(doc)
            }
        })
    } else {
        User.findById(id, (err, doc) => {
            if (err) {
                console.log("Error finding user",user)
                res.status(500).send("Oop")
            } else if (!doc) {
                console.log("Could not find user")
                res.status(404).send("Oop")
            } else {
                res.send(doc)
            }
        })
    }
}