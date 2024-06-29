const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const ErrorHandler = require("../utils/errorHandler");
const { Sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
// const ImageKit = require("imagekit");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: 'secure employe page' });
})

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({ employe });
})

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    Sendtoken(employe, 201, res)
})

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).select("+ password").exec();

    if (!employe)
        return next(new ErrorHandler("Couldn't find employe with this email ", 404));

    const isMatch = employe.comparepassword(req.body.password)
    if (!isMatch) return next(new ErrorHandler(" Wrong Credientials ", 500));
    Sendtoken(employe, 200, res)

})

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookies('token');
    res.json({ message: 'successfully signout!' })
})

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).exec();

    if (!employe)
        return next(new ErrorHandler("Couldn't find employe with this email ", 404));

    const url = ` ${req.protocol}://${req.get('host')}/employe/forget-link/${employe._id}}`;
    sendmail(req, res, next, url);
    employe.resetPasswordToken = "1";
    await employe.save();
    res.json({ employe, url });
})

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    if (!employe)
        return next(new ErrorHandler("Couldn't find employe with this email ", 404));

    if (employe.resetPasswordToken == "1") {
        employe.resetPasswordToken = "0"
        employe.password = req.body.password;
        await employe.save();
    }
    else {
        return next(new ErrorHandler("Invalid Reset Password Link! Pealse try again", 500));
    }
    res.status(200).json({ message: 'password updated successfully' })
})

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec()
    employe.password = req.body.password;
    await employe.save();
    Sendtoken(employe, 201, res)
    // res.status(200).json({ message: 'password updated successfully' })
})

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
     await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: 'employe details updated successfully',  
    })
})

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    const file = req.files.organizationlogo
    const modifiedFileName = 'resumebuilder-${Date.now()} ${path.extname(file.name)}'

    if(employe.organizationlogo.fileId !== ""){
        await imageKit.deleteFile(employe.organizationlogo.fileId)
    }

    const {fileId, url} = await imageKit.upload({
        file: file.data,
        fileName: modifiedFileName,
    }) 

    employe.organizationlogo = {fileId, url}
    await employe.save()
    res.status(200).json({
        success: true,
        message: 'employe profile updated successfully',  
    })
})


//--------------------internships------------------------

exports.createinternship =  catchAsyncErrors(async (req, res, next) => {
    const internship = await new Internship(req.body).save();
    res.status(201).json({success: true, internship})    
})
