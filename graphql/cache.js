import { InMemoryCache } from "@apollo/client";

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

export default cache;