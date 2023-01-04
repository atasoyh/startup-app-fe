
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/apollo';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

