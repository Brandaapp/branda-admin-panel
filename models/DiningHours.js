const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diningHours = new Schema({
    _id: {
        type: Number
      },
      Dining: {
        type: Object
      }
});

const DiningHours = mongoose.model.DiningHours || mongoose.model('DiningHours', diningHours);
module.exports = DiningHours;