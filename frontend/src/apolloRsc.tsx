import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { NEXT_PUBLIC_BACKEND_URL } from './utilities/environment';

// Apollo Client registration
export const { getClient, query, PreloadQuery } = registerApolloClient(
  (): ApolloClient<unknown> => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: `${NEXT_PUBLIC_BACKEND_URL}/graphql`,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        // fetchOptions: { cache: "no-store" },
      }),
    });
  },
);
