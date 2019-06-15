const graphql = require("../graphql");
const auth = require("../auth");

export const commentPage = () => {
  if (process.env.NODE_ENV === "production") {
    if (document.getElementById("dev")) {
      document.getElementById("dev").style.display = "none";
    }
  }

  const commentSendEvent = () => {
    const mutation = (user, player, comment, point) => {
      const params = {name:user,player:player,comment:comment,point:point};
      graphql.mutation(params);
    };

    const player = document.getElementById("select-player").value;
    const comment = document.getElementById("input-comment").value;
    const point = document.getElementById("select-point").value;
    auth.currentUser((user) => {mutation(user,player,comment,point)});
    //graphql.mutation();
  };

  if (document.getElementById("comment")) {
    const SendButton = document.getElementById("comment-send");
    if (SendButton) SendButton.addEventListener('click', commentSendEvent);
  }
};