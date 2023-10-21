import express from 'express';
import bodyParser from 'body-parser';

import ErrorCatcherMiddleware from './features/shared/middleware/ErrorCatcherMiddleware/ErrorCatcherMiddleware';
import SetResponseCORSHeadersMiddleware from './features/shared/middleware/SetResponseCORSHeadersMiddleware/SetResponseCORSHeadersMiddleware';
import ConsoleLoggerMiddleware from './features/shared/middleware/ConsoleLoggerMiddleware/ConsoleLoggerMiddleware';

import myResourceRoutes from './features/myFeature/myResource/myResourceRoutes';

const app = express();

app.use(bodyParser.json());

app.use(SetResponseCORSHeadersMiddleware);
app.use(ConsoleLoggerMiddleware);

app.get('/', (req, res) => {
  res.send(`
      <html><head></head><body>
        <h1>MyApp's Back-End API.</h1>
      </body></html>
    `);
});

app.use(myResourceRoutes);

app.use(ErrorCatcherMiddleware);

export default app;
