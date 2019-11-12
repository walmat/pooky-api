import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';

import * as structures from '@pooky/structures';

const {
  graphql: { Cookies, CookiesInputType, SettingsInputType, SettingsType },
} = structures;

const query = new GraphQLObjectType({
  name: 'QueryAPI',
  description: 'Query API for Pooky API',
  fields: () => ({
    cookies: {
      type: GraphQLList(GraphQLNonNull(Cookies)),
      description: 'Retrieve a set of generated cookies',
      resolve: root => root.getCookies(),
    },
    settings: {
      type: GraphQLNonNull(SettingsType),
      description: 'Retrieve settings',
      resolve: root => root.getSettings(),
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
    editCookies: {
      type: Cookies,
      description: 'Edit an existing cookies object with new data',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
          description: 'id of cookies to edit',
        },
        data: {
          type: GraphQLNonNull(CookiesInputType),
          description: 'Cookies object data to store',
        },
      },
      resolve: (root, { id, data }) => root.editCookies(id, data),
    },
    updateSettings: {
      type: SettingsType,
      description: 'Update the saved settings',
      args: {
        data: {
          type: GraphQLNonNull(SettingsInputType),
          description: 'Updated settings to save',
        },
      },
      resolve: (root, { data }) => root.updateSettings(data),
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
  types: [Cookies, SettingsType],
});

export default schema;
