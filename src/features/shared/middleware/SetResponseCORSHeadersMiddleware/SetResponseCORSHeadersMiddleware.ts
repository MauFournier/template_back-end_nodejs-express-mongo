const SetResponseCORSHeadersMiddleware = (req: any, res: any, next: any) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });

  next();
};

export default SetResponseCORSHeadersMiddleware;
