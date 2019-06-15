import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export const NOT_AUTH = "not authenticated";

export const signUp = (email, password, callback) => {
  Auth.signUp(email, password)
    .then(data => {
      alert("登録メールアドレスに検証コードを送信しました");
      callback();
    })
    .catch(err => {
      console.log(err);
      alert(`エラーが発生しました:${err.message}`);
    });
};

export const verify = (email, code, callback) => {
  Auth.confirmSignUp(email, code, callback)
    .then(data => {
      alert("ユーザ登録が完了しました。");
      callback();
    })
    .catch(err => {
      console.log(err);
      alert("検証に失敗しました");
    });
};

export const signIn = (email, password, callback) => {
  Auth.signIn(email, password)
    .then(data => {
      alert("サインインに成功しました");
      callback();
    })
    .catch(err => {
      console.log(err);
      alert("サインインに失敗しました");
    });
};

export const signOut = callback => {
  Auth.signOut()
    .then(data => {
      alert("サインアウトしました");
      callback();
    })
    .catch(err => {
      console.log(err);
      alert("サインアウトに失敗しました");
    });
};

export const forget = email => {
  Auth.forgotPassword(email)
    .then(data => {
      alert("送信に成功しました");
    })
    .catch(err => {
      console.log(err);
      alert("送信に失敗しました");
    });
};

export const resetPassword = (email, code, password, callback) => {
  Auth.forgotPasswordSubmit(email, code, password)
    .then(data => {
      alert("パスワードリセットに成功しました");
      callback();
    })
    .catch(err => {
      console.log(err);
      alert("パスワードリセットに失敗しました");
    });
};

export const currentUser = callback => {
  const filter = data => {
    console.log(data);
    return data === NOT_AUTH ? data : data.attributes.email;
  };

  Auth.currentAuthenticatedUser({
    bypassCache: false
  })
    .then(user => callback(filter(user)))
    .catch(err => callback(filter(err)));
};
