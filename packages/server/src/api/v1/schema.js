import { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';

import * as structures from '@pooky/structures';

const {
  graphql: { Cookies, CookiesInputType },
} = structures;

const query = new GraphQLObjectType({
  name: 'QueryAPI',
  description: 'Query API for Pooky API',
  fields: () => ({
    cookies: {
      type: Cookies,
      description: 'Retrieve one set of cookies',
      resolve: root => root.getCookies(),
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'MutationAPI',
  description: 'Mutation API for Pooky API',
  fields: () => ({
    addCookies: {
      type: Cookies,
      description: 'Add a new cookies object',
      args: {
        data: {
          type: GraphQLNonNull(CookiesInputType),
          description: 'Cookies object data to store',
        },
      },
      resolve: (root, { data }) => root.addCookies(data),
    },
    flushCookies: {
      type: Cookies,
      description: 'Flushes all cookies from the store',
      resolve: root => root.flushCookies(),
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
  types: [Cookies],
});

export default schema;
