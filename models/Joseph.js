const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JosephSchema = new Schema({
  _id: Schema.Types.ObjectId,
  date: Date
});

const JosephRunning = mongoose.models.JosephRunning || mongoose.model('JosephRunning', JosephSchema);

module.exports = JosephRunning;
