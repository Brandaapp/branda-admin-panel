import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BranvanSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date: String,
    hour: Number,
    minute: Number,
    stops: {
        "4144918": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212012": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4144846": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4144942": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4144886": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211998": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4144878": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4144782": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211976": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212008": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212004": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212038": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212014": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212002": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211986": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211980": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212042": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212036": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212010": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211992": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212032": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212020": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212026": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212018": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212022": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212028": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211996": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211984": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211988": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212034": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212030": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211990": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212044": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211982": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212016": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212006": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212000": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4212024": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211994": [{uuid: String, name: String, num: Number, ingress: Boolean}],
        "4211978": [{uuid: String, name: String, num: Number, ingress: Boolean}]}
            
});

module.exports = mongoose.models.BranvanSchema || mongoose.model('BranvanSchema', BranvanSchema);