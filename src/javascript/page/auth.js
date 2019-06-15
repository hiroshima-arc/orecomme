const {
  signUp,
  verify,
  signIn,
  signOut,
  currentUser,
  forget,
  resetPassword,
  NOT_AUTH
} = require("../auth");


export const authPage = () => {
  const SignUpButton = document.getElementById("sign-up");
  if (SignUpButton) {
    const signUpEvent = () => {
      const email = document.querySelector("#inputEmail").value;
      const password = document.querySelector("#inputPassword").value;
      const confirmPassword = document.querySelector("#confirmPassword").value;

      if (email === "") return alert("メールアドレスが未入力です");
      if (password === "") return alert("パスワードが未入力です");
      if (password.length < 8) return alert("パスワードは8文字以上です");
      if (confirmPassword === "") return alert("確認パスワードが未入力です");
      if (password !== confirmPassword) return alert("パスワードが一致しません");

      const callback = () => { location.href = "/verify.html" };
      signUp(email, password, callback);
    };
    SignUpButton.addEventListener("click", signUpEvent);
  }

  const VerifyButton = document.getElementById("verify");
  if (VerifyButton) {
    const verifyEvent = () => {
      const email = document.querySelector("#inputVerifyEmail").value;
      const code = document.querySelector("#inputVerifyCode").value;

      if (email === "") return alert("メールアドレスが未入力です");
      if (code === "") return alert("コードが未入力です");

      const callback = () => {location.href = "./signin.html"};
      verify(email, code, callback);
    };
    VerifyButton.addEventListener("click", verifyEvent);
  }

  const SignInButton = document.getElementById("sign-in");
  if(SignInButton) {
    const signInEvent = () => {
      const email = document.querySelector("#inputEmail").value;
      const password = document.querySelector("#inputPassword").value;

      if (email === "") return alert("メールアドレスが未入力です");
      if (password === "") return alert("パスワードが未入力です");

      const callback = () => { location.href = "./service.html" };
      signIn(email, password, callback);
    };
    SignInButton.addEventListener("click", signInEvent);
  }

  const SignOutButton = document.getElementById("sign-out");
  if (SignOutButton) {
    const signOutEvent = () => {
      const callback = () => { location.href = "./" };
      signOut(callback);
    };
    SignOutButton.addEventListener("click", signOutEvent);
  }

  const ForgetButton = document.getElementById("forget");
  if (ForgetButton) {
    const forgetEvent = () => {
      const email = document.querySelector("#inputEmail").value;

      if (email === "") return alert("メールアドレスが未入力です");

      forget(email);
    };
    ForgetButton.addEventListener("click", forgetEvent);
  }

  const ResetButton = document.getElementById("reset");
  if (ResetButton) {
    const resetPasswordEvent = () => {
      const email = document.querySelector("#inputEmail").value;
      const code = document.querySelector("#inputCode").value;
      const password = document.querySelector("#inputPassword").value;

      if (email === "") return alert("メールアドレスが未入力です");
      if (code === "") return alert("コードが未入力です");
      if (password === "") return alert("パスワードが未入力です");

      const callback = () => { location.href = "./signin.html"; }
      resetPassword(email, code, password, callback);
    };
    ResetButton.addEventListener("click", resetPasswordEvent);
  }

  const signinUser = document.getElementById("signin-user");
  if (signinUser) {
    const renderCurrentUser = data => {
      if (data === NOT_AUTH) return (location.href = "./");
      document.querySelector("#signin-user").value = data;
    };
    currentUser(renderCurrentUser);
  }
};

