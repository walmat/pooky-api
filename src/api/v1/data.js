import graphqlHTTP from 'express-graphql';

import DataSchema from './schema';

const attachGraphQLDataRoute = (app, route, root) => {
  app.use(
    route,
    graphqlHTTP({
      schema: DataSchema,
      rootValue: root,
      graphiql: process.env.NODE_ENV === 'development',
    }),
  );
};

export default attachGraphQLDataRoute;
