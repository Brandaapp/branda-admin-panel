import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ShuttleRouteScheduleSchema = new Schema({
  name: String,
  data: Object
});

module.exports = mongoose.models.ShuttleRouteSchedule ||
  mongoose.model('ShuttleRouteSchedule', ShuttleRouteScheduleSchema);
