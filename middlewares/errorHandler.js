// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    error: true,
    message,
  });
};
