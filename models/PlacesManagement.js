var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var test =require("./defaultData.json");

var loop = [];
//reorganize based on which information is given
for(var x = 0; x < 44; x++){
 loop.push({week: x ,
            monday: "7:30am-2:00am",
            tuesday: "7:30am-2:00am",
            wednesday: "7:30am-2:00am",
            thursday: "7:30am-2:00am",
            friday: "7:30am-10:00pm",
            saturday:"9:00am-10:00pm",
            sunday:"9:00am-2:00am"
          });
}

//the stein and mandel caffe were not calculated 9/14/2018
var PlacesManagementSchema = new Schema({

  emp_id: {
    type: String
  },
  Name: {
    type: String
  },
  group: {
    type: String
  },
  weeks : {
        type: Array,
        default: loop
    },
  monday: {
    type: String,
    default: "",
  },
  tuesday: {
    type: String,
    default: "",
  },
  wednesday: {
    type: String,
    default: "",
  },
  thursday: {
    type: String,
    default: "",
  },
  friday: {
    type: String,
    default: "",
  },
  saturday:{
    type: String,
    default: "",
  },
  sunday:{
    type: String,
    default: "",
  },
  active: {
    type: Number,
    default: 1,
  }
});

module.exports = mongoose.models.EmployeeSchedule || mongoose.model('EmployeeSchedule', PlacesManagementSchema);