
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import useApollo from '../graphql/useApollo';

const MyApp = ({ Component, pageProps }) => {
  const { client, clearLocaleCache } = useApollo();

  if (!client) {
    return <h2>Initializing app...</h2>;
  }

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} clearCache={clearLocaleCache} />
    </ApolloProvider>
  );
}

export default MyApp;

