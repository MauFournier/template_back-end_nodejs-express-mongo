# Back-end for My App

A back-end template built on Node.js, Express, and MongoDB, and hosted on Google Cloud Platform.

## Getting Started

Follow these steps to get the project up and running for local development:

1. Clone the repository:

```
git clone https://github.com/MauFournier/template_back-end_nodejs-express-mongo.git
cd your-repo-name
```

2. Install the dependencies:

```
npm install
```

3. Set up your environment variables:

- Create a `.env` file in the project root directory.
- Copy the contents of the `.env.example` file into the `.env` file.
- Replace the placeholder values with your actual environment variables.

Example:

```
MONGODB_URI_LOCAL=mongodb://localhost:27017/your_database_name
MONGODB_URI_ATLAS=mongodb+srv://<mongo_user>:<mongo_password>@kiwicoco-001-pri.xr9sz.mongodb.net/your_database_name?retryWrites=true&w=majority
NODE_ENV=development
LOG_REQUESTS_AND_RESPONSES=false
```

**Note:** If you're using a service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), make sure to replace the `MONGODB_URI_LOCAL` and `MONGODB_URI_ATLAS` values with the connection strings provided by the service.

4. Build and Start the development server:

```
npm run build
npm run start
```

5. The server should now be running at [http://localhost:3000](http://localhost:3000).

6. Deploy the project to Google Cloud Platform:

Replace the VPC connector in the `app.yaml` file with your own VPC connector (if you're using a different one).

```
gcloud app deploy
```

### Availability:

The code in this template is PRIVATE and protected by copyright.
