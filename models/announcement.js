let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BranvanNotifSchema = new Schema({
    _id: Schema.Types.ObjectId,
    type: String,
    content: String, 
    startTime: Date,
    endTime: Date
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = mongoose.models.BranvanNotif || mongoose.model('BranvanNotif', BranvanNotifSchema);