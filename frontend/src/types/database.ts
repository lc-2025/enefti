import { ApolloError } from '@apollo/client';
import { NftsQuery } from './graphql/graphql';

// Types - Database
type TQuery = {
  loading: boolean;
  data: NftsQuery | undefined;
  error: ApolloError | undefined;
};

export default TQuery;
