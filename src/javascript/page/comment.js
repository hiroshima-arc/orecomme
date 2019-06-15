const graphql = require("../graphql");
const auth = require("../auth");

export const commentPage = () => {
  if (process.env.NODE_ENV === "production") {
    if (document.getElementById("dev")) {
      document.getElementById("dev").style.display = "none";
    }
  }

  const commentSendEvent = () => {
    const mutation = (user, inning, player, profileNumber,comment, point) => {
      const params = {
        name:user,
        inning:inning,
        player:player,
        profileNumber:profileNumber,
        comment:comment,
        point:point
      };
      console.log(JSON.stringify(params));
      graphql.mutation(params);
    };

    const inning = document.getElementById("input-inning").value;
    const player = document.getElementById("select-player").value;
    const profileNumber = document.getElementById("input-profile-number").value;
    const comment = document.getElementById("input-comment").value;
    const point = document.getElementById("select-point").value;
    auth.currentUser((user) => {mutation(user,inning,player,profileNumber, comment,point)});
    //graphql.mutation();
  };

  if (document.getElementById("comment")) {
    const SendButton = document.getElementById("comment-send");
    if (SendButton) SendButton.addEventListener('click', commentSendEvent);
  }
};