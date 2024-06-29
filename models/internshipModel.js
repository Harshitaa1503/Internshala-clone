const mongoose = require('mongoose');

const internshipModel = new mongoose.Schema({
    profile: {
        type: String,
        // require: [true, "First Name is required"],
        // minLength: [4, "Max length is required"],
    },
    skill: String,
    internshiptype: {
        type: String,
        enum: ['In Office' , 'Remote']
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipends: {
       status: {
        type: String,
        enum: ["Fixed" , "Negotiable" , "Performance based" , "Unpaid"]
       } ,
       amount: Number,
    },
    perks: String,
    assessments: String,

}, { timestamps: true })

const InternshipModel = mongoose.model("internshipModel", internshipModel);

module.exports = InternshipModel;
