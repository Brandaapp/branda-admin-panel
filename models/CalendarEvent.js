var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CalendarEventSchema = new Schema({
    "eventID": {
        type: String
    },
    "id": {
        type: String
    },
    "imageSource": {
        type: String
    },
    "title": {
        type: String
    },
    "description": {
        type: String
    },
    "location": {
        type: String
    },
    "room": {
        type: String
    },
    "info": {
        type: String
    },
    "link1": {
        type: String
    },
    "link2": {
        type: String
    },
    "cat": {
        type: String
    },
    "filters": {
        type: Array
    },
    "startDateTime": {
        type: String
    },
    "endDateTime": {
        type: String
    },
    "dateForgroup": {
        type: Array
    },
    "year": {
        type: String
    },
    "month": {
        type: String
    }
});

const CalendarEvent = mongoose.models.CalendarEvent || mongoose.model('CalendarEvent', CalendarEventSchema);
module.exports = CalendarEvent;