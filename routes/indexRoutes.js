const express = require('express');
const router = require('router');

const { homepage, studentsignup, 
    studentsignin, studentsignout, 
    currentUser, studentsendmail, 
    studentforgetlink, studentresetpassword,
    studentupdate, studentavatar
} = require('../controllers/indexController');

const {isAuthenticated} = require('../middlewares/auth');

//GET /
router.get('/' ,homepage)

//POST /student
router.post('/student', isAuthenticated , currentUser)

//POST /student/register or sign up
router.post('/student/signup', studentsignup);

//POST /student/signin
router.post('/student/signin', studentsignin);

//POST /student/signout
router.post('/student/signout', isAuthenticated, studentsignout);

//POST /student/forget (send-mail)
router.post('/student/send-mail', studentsendmail);

//GET /student/forget-link /: studentid
router.get('/student/forget-link/:id ', studentforgetlink);

//POST /student/reset-passowrd/: student:id
router.post('/student/reset-password/:id', isAuthenticated, studentresetpassword);

//POST /student/update/: student:id
router.post('/student/update/:id', isAuthenticated, studentupdate);

//POST /student/avatar/: student:id
router.post('/student/avatar/:id', isAuthenticated, studentavatar);


module.exports = router;
