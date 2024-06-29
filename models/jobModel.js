const mongoose = require('mongoose');

const jobModel = new mongoose.Schema({
    title: {
        type: String,
        // require: [true, "First Name is required"],
        // minLength: [4, "Max length is required"],
    },
    skill: String,
    jobtype: {
        type: String,
        enum: ['In Office' , 'Remote']
    },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    assessments: String,

}, { timestamps: true })

const Job = mongoose.model("job ", jobModel);

module.exports = Job;
