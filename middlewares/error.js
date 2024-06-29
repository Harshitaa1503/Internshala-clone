exports.getgentatedErrors = (err, req, res, next) => {
    const statuscode = err.statusCode || 500

    if (err.name === "MongoServerError" && err.message.includes("E1000 Duplicate key")){
        err.message= "Student with this email already exists"
    }

    res.status(statuscode).json({
        message: err.message,
        errName: err.name
        // stack: err.stack
    })
};