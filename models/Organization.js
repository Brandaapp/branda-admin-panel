const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String,
    default: 'Club'
  },
  members: {
    type: [String],
    default: []
  }, // the push token of each member of this club
  maxMessagesAllowed: {
    type: Number,
    default: 5
  },
  messageNumber: {
    type: Number, // where this message falls in the chronological order of all messages sent by this org
    default: 0
  },
  messagesSent: {
    type: [
      {
        title: String,
        message: String,
        date: Date,
        deliveredSuccessfully: {
          type: Boolean,
          default: false
        }
      }
    ],
    default: []
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);
