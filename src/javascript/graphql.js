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
    inning: params.inning,
    player: params.player,
    profile_number: params.profileNumber,
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
    graphqlOperation(subscriptions.onCreateComment)
  ).subscribe({
    next: commentData => {
      console.log(commentData);

      // Update chart.
      gauge1.update(commentData.value.data.onCreateComment.point * 20);
      chart.data.datasets[0].data.push(
        commentData.value.data.onCreateComment.point
      );
      chart.update();

      // Update message.
      const player = commentData.value.data.onCreateComment.player;
      const comment = commentData.value.data.onCreateComment.comment;
      const profileNumber =
        commentData.value.data.onCreateComment.profile_number;
      const messageChild = `<div class="line__left">
                  <figure>
                    <img src="/img/player/${profileNumber}.jpg" />
                  </figure>
                  <div class="line__left-text">
                    <div class="name">${player}</div>
                    <div class="text">
                      ${comment}
                    </div>
                  </div>
                </div>`;
      const messageParent = document.getElementById("LineMessages");
      console.log(messageParent);
      messageParent.innerHTML = messageParent.innerHTML + messageChild;
    }
  });

  // Stop receiving data updates from the subscription
  //subscription.unsubscribe();
};
