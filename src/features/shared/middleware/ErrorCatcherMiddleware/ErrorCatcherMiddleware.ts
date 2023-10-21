const ErrorCatcherMiddleware = (err: any, req: any, res: any, next: any) => {
  if (!err.isOperational) {
    console.error('Unexpected error:', err);
    return res.status(500).json({
      message: 'Something went wrong! Please try again later.',
    });
  }

  res.status(err.statusCode).json({
    message: err.message,
  });
};

export default ErrorCatcherMiddleware;
