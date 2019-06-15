import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";

// Simple query
export const query = async () => {
  const allComments = await API.graphql(graphqlOperation(queries.listComments));
  console.log(allComments);
};

// Query using a parameter
export const queryWithParams = async params => {
  const oneComment = await API.graphql(
    graphqlOperation(queries.getComment, params)
  );
  console.log(oneComment);
};

// Mutation
export const mutation = async params => {
  const commentDetails = {
    name: params.name,
    player: params.player,
    comment: params.comment,
    point: params.point
  };

  const newTodo = await API.graphql(
    graphqlOperation(mutations.createComment, { input: commentDetails })
  );
  console.log(newTodo);
};

//mutation();

export const subscribe = () => {
  // Subscribe to creation of Todo
  const subscription = API.graphql(
    graphqlOperation(subscriptions.onCreateTodo)
  ).subscribe({
    next: todoData => console.log(todoData)
  });

  // Stop receiving data updates from the subscription
  subscription.unsubscribe();
};
