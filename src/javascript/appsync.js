import { Auth } from "aws-amplify";
import gql from "graphql-tag";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import awsconfig from "../aws-exports";
import { listTodos } from "../graphql/queries";
import { createTodo } from "../graphql/mutations";
import { onCreateTodo } from "../graphql/subscriptions";

let client = "";
if (awsconfig.aws_appsync_graphqlEndpoint) {
  client = new AWSAppSyncClient({
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: async () =>
        (await Auth.currentSession()).getIdToken().getJwtToken()
    }
  });
}

export const query = () => {
  client
    .query({
      query: gql(listTodos)
    })
    .then(({ data: { listTodos } }) => {
      console.log(listTodos.items);
    });
};

export const create = async () => {
  const result = await client.mutate({
    mutation: gql(createTodo),
    variables: {
      input: {
        name: "Use AppSync",
        description: "Realtime and Offline"
      }
    }
  });
  console.log(result.data.createTodo);
};

export const subscribe = () => {
  let subscription;

  (async () => {
    subscription = client.subscribe({ query: gql(onCreateTodo) }).subscribe({
      next: data => {
        console.log(data.data.onCreateTodo);
      },
      error: error => {
        console.warn(error);
      }
    });
  })();

  // Unsubscribe after 10 secs
  setTimeout(() => {
    subscription.unsubscribe();
  }, 10000);
};
