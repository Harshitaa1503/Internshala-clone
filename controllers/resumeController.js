const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler")
// const errorHandler = require("../utils/errorHandler");
const {v4: uuidv4} = require("uuid");

exports.resume = catchAsyncErrors(async(req, res, next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({ message: 'secure resume page'  , resume });
});

//---------------education---------------

exports.addeducation = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: 'Education added'   });
});

exports.editeducation = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.eduid);
    const eduIndex = student.resume.education.findIndex();
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'Education updated'   });
});

exports.deleteeducation = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i)=> i.id !== req.params.eduid)
    student.resume.education = filterededu;
    await Student.save();
    res.json({ message: ' Education deleted'   });
});

//---------------jobs---------------

exports.addjob = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4( )});
    await  student.save();
    res.json({ message: 'job added'   });
});

exports.editjob = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.jobid);
    const jobIndex = student.resume.jobs.findIndex();
    student.resume.jobs[jobIndex] = {...student.resume.jobs[jobIndex], ...req.body}
    await  student.save();
    res.json({ message: 'job updated'   });
});

exports.deletejob = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredjob = student.resume.jobs.filter((i)=> i.id !== req.params.jobid)
    student.resume.jobs = filteredjob;
    await Student.save();
    res.json({ message: ' job deleted'   });
});

//---------------internship---------------

exports.addintern = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: 'internships added'   });
});

exports.editintern = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.internid);
    const internIndex = student.resume.internships.findIndex();
    student.resume.internships[internIndex] = {...student.resume.internships[internIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'internships updated'   });
});

exports.deleteintern = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredintern = student.resume.internships.filter((i)=> i.id !== req.params.internid)
    student.resume.internships = filteredintern;
    await Student.save();
    res.json({ message: ' internships deleted'   });
});

//---------------courses---------------

exports.addcours = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: 'courses added'   });
});

exports.editcours = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.coursid);
    const coursIndex = student.resume.courses.findIndex();
    student.resume.courses[coursIndex] = {...student.resume.courses[coursIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'courses updated'   });
});

exports.deletecours = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredcours = student.resume.courses.filter((i)=> i.id !== req.params.coursid)
    student.resume.courses = filteredcours;
    await Student.save();
    res.json({ message: ' courses deleted'   });
});

//---------------projects---------------

exports.addproj = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: 'projects added'   });
});

exports.editproj = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.projid);
    const projIndex = student.resume.projects.findIndex();
    student.resume.projects[projIndex] = {...student.resume.projects[projIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'projects updated'   });
});

exports.deleteproj = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredproj = student.resume.projects.filter((i)=> i.id !== req.params.projid)
    student.resume.projects = filteredproj;
    await Student.save();
    res.json({ message: 'projects deleted'   });
});

//---------------responsibitites---------------

exports.addresp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: 'responsibilities added'   });
});

exports.editresp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.respid);
    const respIndex = student.resume.responsibilities.findIndex();
    student.resume.responsibilities[respIndex] = {...student.resume.responsibilities[respIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'responsibilities updated'   });
});

exports.deleteresp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredresp = student.resume.responsibilities.filter((i)=> i.id !== req.params.respid)
    student.resume.responsibilities = filteredresp;
    await Student.save();
    res.json({ message: ' responsibilities deleted'   });
});

//---------------skills---------------

exports.addskill = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: ' skills added'   });
});

exports.editskill = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.skillid);
    const skillIndex = student.resume.skills.findIndex();
    student.resume.skills[skillIndex] = {...student.resume.skills[skillIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'skills updated'   });
});

exports.deleteskill = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredskill = student.resume.skills.filter((i)=> i.id !== req.params.skillid)
    student.resume.skills = filteredskill;
    await Student.save();
    res.json({ message: ' skills deleted'   });
});

//---------------accomplishment---------------

exports.addacomp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id: uuidv4( )});
    await  Student.save();
    res.json({ message: 'accomplishments added'   });
});

exports.editacomp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findIndex(i => i.id === req.params.acompid);
    const acompIndex = student.resume.accomplishments.findIndex();
    student.resume.accomplishments[acompIndex] = {...student.resume.accomplishments[acompIndex], ...req.body}
    await  Student.save();
    res.json({ message: 'accomplishments updated'   });
});

exports.deleteacomp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredacomp = student.resume.accomplishments.filter((i)=> i.id !== req.params.acompid)
    student.resume.accomplishments = filteredacomp;
    await Student.save();
    res.json({ message: ' accomplishments deleted'   });
});
