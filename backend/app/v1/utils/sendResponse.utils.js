exports.sendResponse = function (res, code, status, message, result) {
  return res.status(code).json({ status, message, result });
};
