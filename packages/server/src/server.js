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
attachV1DataRoute(app, '/api/v1/data', rootResolver);

const port = process.env.PORT || 5000;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`server listening on ${port}`);
