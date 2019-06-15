import Amplify, { API } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

export const apiCall = () => {
  let apiName = awsconfig.aws_cloud_logic_custom[0].name;
  let path = "/items";
  let myInit = {
    // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      // OPTIONAL
      name: "param"
    }
  };
  API.get(apiName, path, myInit)
    .then(response => {
      console.log(response);
      // Add your code here
    })
    .catch(error => {
      console.log(error.response);
    });
};
