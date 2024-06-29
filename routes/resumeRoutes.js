const express = require('express');
const router = require('router');

const {resume, addeducation, editeducation, deleteeducation,
    addacomp, editacomp, deleteacomp, 
    addcours, editcours, deletecours, 
    addintern, editintern, deleteintern,
    addjob, editjob, deletejob, 
    addproj, editproj, deleteproj, 
    addresp, editresp, deleteresp, 
    addskill, editskill, deleteskill,
} = require('../controllers/resumeController');

const {isAuthenticated} = require('../middlewares/auth');

//GET /
router.get('/' ,isAuthenticated, resume)

//---------------EDUCATION----------------

//POST 
router.post('/add-edu' ,isAuthenticated, addeducation)

//POST 
router.post('/edit-edu/:eduid' ,isAuthenticated, editeducation)

//POST 
router.post('/delete-edu/:eduid' ,isAuthenticated, deleteeducation)

//----------------JOBS----------------

//POST
router.post('/add-job' ,isAuthenticated, addjob)

//POST 
router.post('/edit-job/:jobid' ,isAuthenticated, editjob)

//POST 
router.post('/delete-job/:jobid' ,isAuthenticated, deletejob)

//-----------------internship---------------------

//POST
router.post('/add-intern' ,isAuthenticated, addintern)

//POST 
router.post('/edit-intern/:internid' ,isAuthenticated, editintern)

//POST 
router.post('/delete-intern/:internid' ,isAuthenticated, deleteintern)

//-----------------courses--------------------- 

//POST
router.post('/add-cours' ,isAuthenticated, addcours)

//POST 
router.post('/edit-cours/:coursid' ,isAuthenticated, editcours)

//POST 
router.post('/delete-cours/:coursid' ,isAuthenticated, deletecours)

//-----------------project---------------------

//POST
router.post('/add-proj' ,isAuthenticated, addproj)

//POST 
router.post('/edit-proj/:projid' ,isAuthenticated, editproj)

//POST 
router.post('/delete-proj/:projid' ,isAuthenticated, deleteproj)

//----------------responsibilities---------------------

//POST
router.post('/add-resp' ,isAuthenticated, addresp)

//POST 
router.post('/edit-resp/:respid' ,isAuthenticated, editresp)

//POST 
router.post('/delete-resp/:respid' ,isAuthenticated, deleteresp)

//-----------------skills---------------------

//POST
router.post('/add-skill' ,isAuthenticated, addskill)

//POST 
router.post('/edit-skill/:skillid' ,isAuthenticated, editskill)

//POST 
router.post('/delete-skill/:skillid' ,isAuthenticated, deleteskill)

//-----------------accomplishment---------------------

//POST
router.post('/add-acomp' ,isAuthenticated, addacomp)

//POST 
router.post('/edit-acomp/:acompid' ,isAuthenticated, editacomp)

//POST 
router.post('/delete-acomp/:acompid' ,isAuthenticated, deleteacomp)

module.exports = router;
