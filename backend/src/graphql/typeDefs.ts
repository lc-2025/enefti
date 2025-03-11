import { readFileSync } from 'fs';
import gql from 'graphql-tag';

// Types Definitions
const typeDefs = gql(
  readFileSync(`${__dirname}/schema.graphql`, {
    encoding: 'utf-8',
  }),
);

export default typeDefs;
