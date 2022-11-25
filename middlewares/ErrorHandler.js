// let path = require('path');

const ErrorHandler = (err, req, res, next) => {
    console.log('Middleware Error Handling');
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something Went Wrong';
    res.status(errStatus).json({
        success : false,
        status :errStatus,
        message : errMsg
    })   
    // res.sendFile(path.join(__dirname +'./../views/error.html'));
}

// we have imported in server.js
module.exports = ErrorHandler;