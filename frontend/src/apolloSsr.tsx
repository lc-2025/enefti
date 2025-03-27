'use client';

import {
  HttpLink,
  FieldMergeFunction,
  FieldReadFunction,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { offsetLimitPagination } from '@apollo/client/utilities';
import updateCache from './utilities/graphql';

/**
 * @description Apollo Client Server-Side Rendered
 * For Client Components usage
 * @author Luca Cattide
 * @date 14/03/2025
 * @returns {*}
 */
const makeClient = (): ApolloClient<unknown> => {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    // NextJS requires to invoke the variable straight from the parent `process.env` in order to make it available
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    // fetchOptions: { cache: "no-store" },
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
              // Arguments to exclude to not influence returned cached results
              ...offsetLimitPagination(['ids', 'search']),
              // Pagination policy
              // A read function should always return undefined if existing is
              // undefined. Returning undefined signals that the field is
              // missing from the cache, which instructs Apollo Client to
              // fetch its value from your GraphQL server.
              read(
                existing,
                {
                  args: {
                    // Default to returning the entire cached list,
                    // if offset and limit are not provided.
                    offset = 0,
                    limit = 10,
                  } = {},
                },
              ): FieldReadFunction {
                // If we ask for a page outside the bounds of the existing array,
                // page.length will be 0, and we should return undefined instead of
                // the empty array.
                // FIXME: Not slicing on fetchMore
                return existing && existing.slice(offset, offset + limit);
              },
              // Arguments responsible of returned cached results
              //keyArgs: ['offset', 'limit'],
              // Concatenate the incoming list items with
              // the existing list items.
              merge(
                existing,
                incoming,
                { args: { offset = 0, limit = 10 } },
              ): FieldMergeFunction {
                // FIXME: Not slicing on fetchMore
                return updateCache(existing, incoming, offset, limit);
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
