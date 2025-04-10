export const responseSender = (req, res, next) => {
    res.sendSuccess = (data, message = 'success') => {
      return res.status(200).json({
        success: true,
        message,
        data,
      });
    };
  
    res.sendError = (error, message = 'Something went wrong', statusCode = 500) => {
      return res.status(statusCode).json({
        success: false,
        message,
        error,
      });
    };
  
    next();
  };
  
  