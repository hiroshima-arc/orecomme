//const { apiCall } = require("../api");
const graphql = require("../graphql");
//const appsync = require("../appsync");
//const storage = require("../storage");

export const servicePage = async () => {
  if (process.env.NODE_ENV === "production") {
    if (document.getElementById("dev")) {
      document.getElementById("dev").style.display = "none";
    }
  }

  if (document.getElementById("service")) {
    //apiCall();
    //graphql.queryWithParams({id: "1"});
    //graphql.mutation();
    graphql.subscribe();
    //appsync.create();
    //appsync.query();
    //appsync.subscribe();
    //storage.put();
    //storage.get();
    //storage.remove().public();
    //storage.remove().protected();
    //storage.remove().private();
    //storage.list();
    
    // ----
    const onload = async () => {
      const comments = await graphql.query({limit: 3});
      console.log(comments);
      comments.data.listComments.items.forEach((oneComment) => {
        // Update chart.
        gauge1.update(oneComment.point * 20);
        chart.data.datasets[0].data.push(
          oneComment.point
        );
        chart.update();
        
        // Update message.
        const player = oneComment.player;
        const comment = oneComment.comment;
        const profileNumber = oneComment.profile_number;
        const watcherCode = "tanaka";
        const messageChild = `<div class="line__left">
                    <figure>
                      <img src="/img/watcher/${watcherCode}.jpg" />
                    </figure>
                    <div class="line__left-text">
                      <div class="text">
                        <figure class="player"><img src="/img/player/${profileNumber}.jpg" /></figure>
                        ${comment}
                      </div>
                    </div>
                  </div>`;
        const messageParent = document.getElementById("LineMessages");
        messageParent.innerHTML = messageParent.innerHTML + messageChild;
      }); 
    };
    window.addEventListener('load', onload);
  }
};
