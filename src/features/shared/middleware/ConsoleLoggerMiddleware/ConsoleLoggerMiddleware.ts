const ConsoleLoggerMiddleware = (req: any, res: any, next: any) => {
  if (process.env.LOG_REQUESTS_AND_RESPONSES === 'true') {
    const originalSend = res.send;

    res.send = function (...args: any) {
      console.log('---------------');
      try {
        const formattedData = JSON.stringify(JSON.parse(args[0]), null, 2);
        console.log(`Request: ${req.method} ${req.originalUrl}`);
        console.log(`${res.statusCode} Response:`, formattedData);
      } catch (e) {
        console.log(`Request: ${req.method} ${req.originalUrl}`);
        console.log(`${res.statusCode} Response:`, args[0]);
      }

      return originalSend.apply(this, args);
    };
  }

  next();
};

export default ConsoleLoggerMiddleware;
