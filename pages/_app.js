
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import useApollo from '../graphql/useApollo';
import useLocaleStorage from '../hooks/useLocaleStorage';
import GeneralContext from '../providers/general';
import { COMPANY_ID_KEY } from '../constants/storage-keys'


const MyApp = ({ Component, pageProps }) => {
  const [client, persistor] = useApollo();
  const [companyId, setCompanyId, removeCompanyId] = useLocaleStorage(COMPANY_ID_KEY)
  if (!client) {
    return <h2>Initializing app...</h2>;
  }

  const updateCompanyId=(companyId)=>{
    persistor.purge();
    client.clearStore();
    setCompanyId(companyId);
  }

  const resetCompanyId =()=>{
    removeCompanyId();
    persistor.purge();
    client.clearStore();
  }
  // TODO Add a theme provider for the common styles.
  return (
    <GeneralContext.Provider value={{
      values: {
        companyId
      },
      setters: {
        updateCompanyId,
        resetCompanyId,
      }
    }} >
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </GeneralContext.Provider >
  );
}

export default MyApp;

