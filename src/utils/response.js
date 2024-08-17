module.exports = {
  successResponse: (res, data = {}, meta = {}, status = 200, message = "") => {
    return res.status(status).json({
      success: true,
      data,
      meta,
      message,
    });
  },
  errorResponse: (res, errors = {}, status = 500, message = "") => {
    return res.status(status).json({
      success: false,
      errors,
      message,
    });
  },
};
