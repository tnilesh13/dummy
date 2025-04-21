const { statusCode } = require("../constants/constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case statusCode.BAD_REQUEST:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stackTrace });
            break;
        case statusCode.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stackTrace });
            break;
        case statusCode.UNAUTHORIZED:
            res.json({ title: "Un authorized", message: err.message, stackTrace: err.stackTrace });
        case statusCode.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stackTrace });
        case statusCode.INTERNAL_SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stackTrace });
            break;
        default:
            console.log("No Error");
            break;
    }
};

module.exports = errorHandler;
