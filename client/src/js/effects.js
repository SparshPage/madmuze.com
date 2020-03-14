import id from "../auth/Login";

const signUpButton = id.getElementById("signUp");
const signInButton = id.getElementById("signIn");
const container = id.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
