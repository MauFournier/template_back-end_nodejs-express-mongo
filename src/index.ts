import express from 'express';
import bodyParser from 'body-parser';

const MONGODB_URI = process.env.MONGODB_URI;

const defaultPort = 3000;

const app = express();
import mongoose from 'mongoose';

import taskRoutes from './routes/taskRoutes.js';

async function main() {
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

  try {
    if (MONGODB_URI !== undefined) {
      await mongoose.connect(MONGODB_URI);
    }
  } catch (error) {
    console.log(error);
  }

  const PORT = process.env.PORT || defaultPort;
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

main().catch(err => console.log(err));
