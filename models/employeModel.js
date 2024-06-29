const mongoose = require('mongoose');
bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
    //const match = require('nodemon/lib/monitor/match')

const employeModel = new mongoose.Schema({
    firstname: {
        type: String,
        require: [true, "First Name is required"],
        minLength: [4, "Max length is required"],
    },
    lastname: {
        type: String,
        require: [true, "Last Name is required"],
        minLength: [4, "Max length is required"],
    },
    contact: {
        type: String,
        require: [true, "Contact is required"],
        maxLength: [10, "contact must not be exceed 10 characters"],
        minLength: [10, "contact must not be less than 10 characters"],
    },
    city: {
        type: String,
        require: [true, "Last Name is required"],
    },
    email: {
        type: String,
        require: [true, "email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please enter a valid email address"],
        unique: true,
    },
    password: {
        type: String,
        select: false,
        maxLength: [20, 'password should not exceed 20 characters'],
        minLength: [8, 'password should  be at least 8 characters'],
        //match:[]
    },
    resetPasswordToken: {
        type: String,
        default:"0",
    },
    organizationname: {
        type: String,
        require: [true, "organization Name is required"],
        minLength: [4, "Max length is required"],
    },
    organizationlogo: {
        type: object,
        default:{
            fileId: '',
            url: '',
        }
    },
    internship:[{
        type: mongoose.Schema.Types.ObjectId, ref:'internship',
    }],
    jobs:[{
        type: mongoose.Schema.Types.ObjectId, ref:'job',
    }],


}, { timestamps: true })

employeModel.pre("save", function () {

    if (!this.isModified("password")) {
        return;
    }

    let salt = bcrypt.gensalt(10);
    this.password = bcrypt.hashSync(this.password, salt);

})

employeModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

employeModel.methods.getjwttoken = function () {
    return jwttoken.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;