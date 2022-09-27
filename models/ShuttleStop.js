const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShuttleStopSchema = new Schema({
  /**
   * Unique ID for the stop. Might have to be even.
   */
  code: Number,
  /**
   * Optional text describing the stop.
   */
  description: String,
  /**
   * Unique ID for the stop.
   */
  stop_id: Number,
  location_type: String,
  /**
   * Name to be displayed in Branda.
   */
  name: String,
  parent_station_id: String,
  /**
   * Object containing lat/long of the stop.
   */
  location: Object,
  url: String,
  /**
   * Which shuttle route this stop is on.
   */
  route: String
});

const ShuttleStop = mongoose.models.ShuttleStop || mongoose.model('ShuttleStop', ShuttleStopSchema);
module.exports = ShuttleStop;
