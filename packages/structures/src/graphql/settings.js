import { GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType, GraphQLInt } from 'graphql';

export const SettingsType = new GraphQLObjectType({
  name: 'Settings',
  description: 'Settings for the api',
  fields: () => ({
    defaultErrorDelay: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Default error delay when monitoring',
    },
    defaultMonitorDelay: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'Default monitor delay when monitoring',
    },
  }),
});

export const SettingsInputType = new GraphQLInputObjectType({
  name: 'SettingsInput',
  description: 'Input data to update Settings',
  fields: () => ({
    defaultErrorDelay: {
      type: GraphQLInt,
      description: 'Default error delay when monitoring',
    },
    defaultMonitorDelay: {
      type: GraphQLInt,
      description: 'Default monitor delay when monitoring',
    },
  }),
});
