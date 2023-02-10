const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecialEventSchema = new Schema({
  id: {
    type: String
  },
  type: {
    type: String
  },
  sponsor: {
    type: String
  },
  title: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  participants: {
    type: String
  },
  price: {
    type: String
  }
});

module.exports = mongoose.models.SpecialEvent || mongoose.model('SpecialEvent', SpecialEventSchema);
