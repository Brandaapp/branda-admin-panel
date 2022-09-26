const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// TODO: rename to StaffAdminSchema
const UserSchema = new Schema({
  username: String,
  email: String,
  userType: String,
  picture: String,
  salt: String,
  hash: String,
  organizations: [String]
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
