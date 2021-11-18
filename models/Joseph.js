let mongoose = require('mongoose');
let Schema = mongoose.Schema
let JosephSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date: Date
})

const JosephRunning = mongoose.models.JosephRunning || mongoose.model('JosephRunning', JosephSchema)

module.exports = JosephRunning