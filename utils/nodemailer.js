const nodemailer = require('nodemailer');
const ErrorHandler = require('./errorHandler')

exports.sendmail = (req, res, url, next) => {
    const transport = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        // port: 587,
        port: 465,
        // secure: false,  Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'MAX PRIVATE LIMITED',
        to : req.body.email,
        subject: 'password reset link',
        // "text": "do not share this link to anyone",
        html: `<h1>click link below to reset password</h1>
        <a href=${url}> Password Reset Link</a>` 
  }

  transport.sendMail(mailOptions, (err, info) =>{
    if (err) return next(new ErrorHandler(err, 500));
    console.log(info)
    return res.status(200).json({message:"mail send successfully",
        url,
    })
  })
}