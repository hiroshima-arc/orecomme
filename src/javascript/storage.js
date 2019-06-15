import Amplify, { Storage } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);
Storage.configure({ track: true });

export const put = () => {
  Storage.put("test.txt", "Hello")
    .then(result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));

  Storage.put("test.txt", "Protected Content", {
    level: "protected",
    contentType: "text/plain"
  })
    .then(result => console.log(result))
    .catch(err => console.log(err));

  Storage.put("test.txt", "Private Content", {
    level: "private",
    contentType: "text/plain"
  })
    .then(result => console.log(result))
    .catch(err => console.log(err));
};

export const get = () => {
  Storage.get("test.txt")
    .then(result => console.log(result))
    .catch(err => console.log(err));

  Storage.get("test.txt", { level: "protected" })
    .then(result => console.log(result))
    .catch(err => console.log(err));

  Storage.get("test.txt", { level: "private" })
    .then(result => console.log(result))
    .catch(err => console.log(err));

  Storage.get("test.txt", { expires: 60 })
    .then(result => console.log(result))
    .catch(err => console.log(err));
};

export const remove = () => {
  return {
    public: () => {
      Storage.remove("test.txt")
        .then(result => console.log(result))
        .catch(err => console.log(err));
    },
    protected: () => {
      Storage.remove("test.txt", { level: "protected" })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    },
    private: () => {
      Storage.remove("test.txt", { level: "private" })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
  };
};

export const list = () => {
  Storage.list("photos/")
    .then(result => console.log(result))
    .catch(err => console.log(err));

  Storage.list("photos/", { level: "protected" })
    .then(result => console.log(result))
    .catch(err => console.log(err));

  Storage.list("photos/", { level: "private" })
    .then(result => console.log(result))
    .catch(err => console.log(err));
};
