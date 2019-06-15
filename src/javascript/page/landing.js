import { signUpButtonClickEvent1, signUpButtonClickEvent2, signInButtonClickEvent, signOutButtonClickEvent } from "../analytics";

export const landingPage = () => {
  if (document.getElementById("landing")) {
    const landingSignUp1 = document.getElementById("landing-sign-up-1");
    if(landingSignUp1) landingSignUp1.addEventListener("click", signUpButtonClickEvent1);

    const landingSignUp2 = document.getElementById("landing-sign-up-2");
    if (landingSignUp2) landingSignUp2.addEventListener("click", signUpButtonClickEvent2);

    const landingSignIn = document.getElementById("landing-sign-in");
    if(landingSignIn) landingSignIn.addEventListener("click", signInButtonClickEvent);
  }
};

