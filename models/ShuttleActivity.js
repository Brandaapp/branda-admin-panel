import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// This is the schema for the shuttle activity happening in one day at Brandeis

const shuttleActivitySchema = new Schema({
  date: Date,
  times: [
    {
      start: Date,
      end: Date,
      busID: String,
      busName: String,
      route: String,
      ID: String
    }
  ]
});
// THINK ABOUT CHANGING busID to samsaraID
export default mongoose.models.shuttleActivity || mongoose.model('shuttleActivity', shuttleActivitySchema);
