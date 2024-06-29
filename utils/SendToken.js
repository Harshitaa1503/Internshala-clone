// const Student = require("../models/studentModel");

// exports.Sendtoken = (student, statuscode, res)=>{
// const token = student.getjwttoken();

// const options = {
//     expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     // secure: true,
// }

// res.status(statuscode).cookie('token', token, options).json({success: true, id :student._id, token })

// res.json(token);
// }

exports.Sendtoken = (employe, statuscode, res)=>{
    const token = employe.getjwttoken();
    
    const options = {
        expires: new Date(Date.now()+ process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: true,
    }
    
    res.status(statuscode).cookie('token', token, options).json({success: true, id :employe._id, token })
    
    res.json(token);
    }
    