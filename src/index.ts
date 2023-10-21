import express from 'express';
import bodyParser from 'body-parser';

import loadConfig from './config/env';
import connectDB from './config/db';

import taskRoutes from './features/myFeature/myResource/taskRoutes.js';

async function main() {
  const config = await loadConfig();
  const defaultPort = 3000;

  const app = express();

  //middleware to allow the parsing of the incoming request body
  app.use(bodyParser.json());

  //Middleware to set response headers to handle CORS errors
  app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    });

    next();
  });

  app.use(taskRoutes);

  app.get('/', (req, res) => {
    res.send(`
      <html><head></head><body>
        <h1>My app's Back-End API.</h1>
      </body></html>
    `);
  });

  const MONGODB_URI =
    process.env.NODE_ENV === 'production'
      ? config.MONGODB_URI_ATLAS
      : config.MONGODB_URI_LOCAL;

  try {
    if (MONGODB_URI) {
      await connectDB(MONGODB_URI);
    } else {
      console.error('No MongoDB URI provided');
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
  }

  const PORT = config.PORT || defaultPort;
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

main().catch(err => console.log(err));
