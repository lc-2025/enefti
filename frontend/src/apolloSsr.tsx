'use client';

import {
  HttpLink,
  FieldReadFunction,
  FieldMergeFunction,
} from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import updateCache from './utilities/graphql';

/**
 * @description Apollo Client Server-Side Rendered
 * For Client Components usage
 * @author Luca Cattide
 * @date 14/03/2025
 * @returns {*}
 */
const makeClient = (): ApolloClient<unknown> => {
  const { NODE_ENV, BACKEND_URL } = process.env;
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: BACKEND_URL,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: {
      cache: NODE_ENV === 'production' ? 'force-cache' : 'no-store',
    },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache({
      // Define chache policies
      typePolicies: {
        Query: {
          fields: {
            nfts: {
              // Pagination policy
              ...offsetLimitPagination(),
              /**
               * Returns `undefined` if no existing field in cache
               * If so fetch its value from the server
               */
              read(
                existing,
                { args: { offset = 0, limit } },
              ): FieldReadFunction {
                // Return all as default
                limit = limit ?? existing?.length;

                return existing && existing.slice(offset, offset + limit);
              },
              keyArgs: false,
              // Concatenate the incoming list items with the existing cached ones
              merge(
                existing,
                incoming,
                { args: { offset = 0 } },
              ): FieldMergeFunction {
                // Slicing to preserve immutability
                const merged = existing ? existing.slice(0) : [];

                return updateCache(merged, incoming, offset);
              },
            },
          },
        },
      },
    }),
    link: httpLink,
  });
};

// High-Order Component for Apollo usage
export const ApolloWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
