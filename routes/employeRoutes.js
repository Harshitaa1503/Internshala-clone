const express = require('express');
const router = require('router');

const { homepage, employesignup, 
    employesignin, employesignout, 
    currentEmploye, employesendmail, 
    employeforgetlink, employeresetpassword,
    employeupdate, employeavatar,
    createinternship,
} = require('../controllers/employeController');

const {isAuthenticated} = require('../middlewares/auth');

//GET /
router.get('/' ,homepage)

//POST /employe
router.post('/current', isAuthenticated , currentEmploye)

//POST /employe/register or sign up
router.post('/signup', employesignup);

//POST /employe/signin
router.post('/signin', employesignin);

//POST /employe/signout
router.post('/signout', isAuthenticated, employesignout);

//POST /employe/forget (send-mail)
router.post('/send-mail', employesendmail);

//GET /employe/forget-link /: employeid
router.get('/forget-link/:id ', employeforgetlink);

//POST /employe/reset-passowrd/: employe:id
router.post('/reset-password/:id', isAuthenticated, employeresetpassword);

//POST /employe/update/: employe:id
router.post('/update/:id', isAuthenticated, employeupdate);

//POST /employe/avatar/: employe:id
router.post('/avatar/:id', isAuthenticated, employeavatar);

//--------------------internships------------------------

//POST /employe/internship/create
router.post('/internship/create', isAuthenticated, createinternship);


module.exports = router;
