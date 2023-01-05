import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { useEffect, useState } from "react";


const useApollo = () => {
  const [client, setClient] = useState();
  const [persistor, setPersistor] = useState();

  useEffect(() => {
    const init = async () => {
      console.log("init")
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              task(_, { args, toReference }) {
                return toReference({
                  __typename: 'Task',
                  id: args.id,
                });
              },
              phase(_, { args, toReference }) {
                return toReference({
                  __typename: 'Phase',
                  id: args.id,
                });
              },
            },
          },
        },
      });
      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      });
      await newPersistor.restore();

      setPersistor(newPersistor);
      setClient(
        new ApolloClient({
          uri: 'http://localhost:3000/graphql',
          cache,
        }),
      );
    }

    init().catch(console.log);
  }, []);
  console.log(persistor?.purge);
  return { client, clearLocaleCache: persistor?.purge };
}

export default useApollo;
