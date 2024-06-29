const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { Sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
// const ImageKit = require("imagekit");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: 'secure homepage' });
})

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student });
})

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    Sendtoken(student, 201, res)
})
exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+ password").exec();

    if (!student)
        return next(new ErrorHandler("Couldn't find student with this email ", 404));

    const isMatch = student.comparepassword(req.body.password)
    if (!isMatch) return next(new ErrorHandler(" Wrong Credientials ", 500));
    Sendtoken(student, 200, res)

})

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookies('token');
    res.json({ message: 'successfully signout!' })
})

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec();

    if (!student)
        return next(new ErrorHandler("Couldn't find student with this email ", 404));

    const url = ` ${req.protocol}://${req.get('host')}/student/forget-link/${student._id}}`;
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({ student, url });
})

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();

    if (!student)
        return next(new ErrorHandler("Couldn't find student with this email ", 404));

    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0"
        student.password = req.body.password;
        await student.save();
    }
    else {
        return next(new ErrorHandler("Invalid Reset Password Link! Pealse try again", 500));
    }
    res.status(200).json({ message: 'password updated successfully' })
})

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.password = req.body.password;
    await student.save();
    Sendtoken(student, 201, res)
    // res.status(200).json({ message: 'password updated successfully' })
})

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
     await student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: 'student details updated successfully',
        
    })
})

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar
    const modifiedFileName = 'resumebuilder-${Date.now()} ${path.extname(file.name)}'

    if(student.avatar.fileId !== ""){
        await imageKit.deleteFile(student.avatar.fileId)
    }

    const {fileId, url} = await imageKit.upload({
        file: file.data,
        fileName: modifiedFileName,
    }) 

    student.avatar = {fileId, url}
    await student.save()
    res.status(200).json({
        success: true,
        message: 'student profile updated successfully',
        
    })
})
