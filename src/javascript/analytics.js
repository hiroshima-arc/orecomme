import Amplify, { Analytics, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
Analytics.configure(awsconfig);

Analytics.autoTrack("pageView", {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, the event name, by default is 'pageView'
  eventName: "pageView",
  // OPTIONAL, the attributes of the event, you can either pass an object or a function
  // which allows you to define dynamic attributes
  attributes: {
    attr: "attr"
  },
  // when using function
  // attributes: () => {
  //    const attr = somewhere();
  //    return {
  //        myAttr: attr
  //    }
  // },
  // OPTIONAL, by default is 'multiPageApp'
  // you need to change it to 'SPA' if your app is a single-page app like React
  type: "multiPageApp",
  // OPTIONAL, the service provider, by default is the AWS Pinpoint
  provider: "AWSPinpoint",
  // OPTIONAL, to get the current page url
  getUrl: () => {
    // the default function
    return window.location.origin + window.location.pathname;
  }
});

Analytics.autoTrack("event", {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, events you want to track, by default is 'click'
  events: ["click"],
  // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
  // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
  // always put 'data' as the first prefix
  selectorPrefix: "data-amplify-analytics-",
  // OPTIONAL, the service provider, by default is the AWS Pinpoint
  provider: "AWSPinpoint",
  // OPTIONAL, the default attributes of the event, you can either pass an object or a function
  // which allows you to define dynamic attributes
  attributes: {
    attr: "attr"
  }
  // when using function
  // attributes: () => {
  //    const attr = somewhere();
  //    return {
  //        myAttr: attr
  //    }
  // }
});

const recordEvent = (name, params, callback) => {
  console.log(name);
  console.log(params);

  Analytics.record({
    name: name,
    attributes: params
  }).then(async evt => {
    console.log("done");
    await callback();
  });
};

export const signUpButtonClickEvent1 = () => {
  recordEvent("Sign Up", { position: "1" }, () => {
    location.href = "./signup.html";
  });
};

export const signUpButtonClickEvent2 = () => {
  recordEvent("Sign Up", { position: "2" }, () => {
    location.href = "./signup.html";
  });
};

export const signInButtonClickEvent = () => {
  recordEvent("Sign In", {}, () => {
    location.href = "./signin.html";
  });
};

export const signOutButtonClickEvent = async () => {
  Auth.signOut()
    .then(data => {
      let name = "Sign Out";
      let params = {};
      Analytics.record({
        name: name,
        attributes: params
      }).then(async evt => {
        console.log("done");
        alert("サインアウトしました");
        location.href = "./";
      });
    })
    .catch(err => {
      console.log(err);
      alert("サインアウトに失敗しました");
    });
};
