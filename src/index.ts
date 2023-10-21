import loadConfig from './config/env';
import connectDB from './config/db';
import app from './app';

async function main() {
  const config = await loadConfig();
  const defaultPort = 3000;

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
