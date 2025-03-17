import { CodegenConfig } from '@graphql-codegen/cli';

// Apollo Client typing configuration
const config: CodegenConfig = {
  schema: '../backend/src/graphql/schema.graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/types/graphql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
