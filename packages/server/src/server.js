import express from 'express';
import cors from 'cors';

import attachV1DataRoute from './api/v1/data';
import Resolver from './api/resolver';
import configEnv from './env';

configEnv();

const rootResolver = new Resolver();
const app = express();
app.use(cors());

// Attach the v1 graphql data route
attachV1DataRoute(app, '/api/v1/pooky', rootResolver);

const port = process.env.PORT || 5000;

rootResolver.store._client
  .ping()
  .then(() => {
    // Listen for a connection.
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
