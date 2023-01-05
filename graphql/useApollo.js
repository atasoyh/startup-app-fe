import { ApolloClient } from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { useEffect, useState } from "react";
import cache from "./cache";


const useApollo = () => {
  const [client, setClient] = useState();
  const [persistor, setPersistor] = useState();

  useEffect(() => {
    const init = async () => {
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

    init()
  }, []);
  return [ client, persistor ];
}

export default useApollo;
