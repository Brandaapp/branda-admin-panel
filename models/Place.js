import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    Name: {
        type: String
    },
    group: {
        type: String
    },
    active: {
        type: Number,
        default: 1
    }
});

const Place = mongoose.models.Employee || mongoose.model('Employee', PlaceSchema);
module.exports = Place;
