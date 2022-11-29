import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PushNotificationSchema = new Schema({
  author: String,
  title: String,
  body: String,
  link: String,
  to: String,
  sendOn: Date
});

export default (
  mongoose.models.pushNotification || mongoose.model('pushNotification', PushNotificationSchema)
);
