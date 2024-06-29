const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' })


//db connection
require("./models/database").connectDatabase()

//logger
const logger = require('morgn');
app.use(logger('tiny'))

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session") 
const cookieparser = require("cookie-parser") 
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser())

//express file-upload
const fileupload = require('express-fileupload')
app.use(fileupload());

//routes
app.use('/user', require('./routes/indexRoutes'))
app.use('/resume', require('./routes/resumeRoutes'))
app.use('/employe', require('./routes/employeRoutes'))

//error handlers
const errorHandler = require('./utils/errorHandler');
const { genetatedErrors } = require('./midddlewares')

app.all('*', (req, res, next) => {
    next(new errorHandler(`requested url not found ${req.url}`, 404));
})

app.use(genetatedErrors)

app.listen(process.env.PORT, console.log(`server running on port ${PORT}`))