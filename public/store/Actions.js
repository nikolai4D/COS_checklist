//import  from "./Mutations.js";
import navigateTo from "../helpers/navigateTo.js";
// import { stack } from "d3";
import { State } from "./State.js";
import mutate from "./Mutations.js";

class Actions {
  constructor() {}
  async LOGIN() {
    console.log("Login function");
    const loginForm = document.getElementById("login-form");
    const email = loginForm.email.value;
    const pwd = loginForm.pwd.value;

    let response;
    try {
      response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, pwd }),
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }

    console.log(response.status, "response.status");

    if (!(response.status === 200)) {
      alert(`${response.statusText}`);
      navigateTo("/login");
      throw new Error(
        `status: ${response.status}, status text: ${response.statusText}`
      );
    }

    const token = `Bearer ${(await response.json()).accessToken}`;

    mutate.SET_ACCESSTOKEN(await token);
    console.log(State, "NEW STATE");

    //Redirection Part
    navigateTo("/");
  }

  //   async LOGOUT() {
  //     console.log("Logout function");
  //     State.accessToken = undefined;
  //     try {
  //       await fetch("/api/logout");
  //       navigateTo("/login");
  //     } catch (err) {
  //       console.log("error");
  //     }
  //   }
  //   async REGISTER() {
  //     console.log("Register function");

  //     const registerForm = document.getElementById("register-form");
  //     const email = registerForm.email.value;
  //     const pwd = registerForm.pwd.value;
  //     const code = registerForm.code.value;

  //     try {
  //       const responseAuth = await fetch("/api/register", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({ email, pwd, code }),
  //       });

  //       if (!responseAuth.ok) {
  //         if (responseAuth.status === 409) {
  //           navigateTo("/login");
  //           return alert("Registration not ok");
  //         }
  //         throw new Error(`${responseAuth.status} ${responseAuth.statusText}`);
  //       }

  //       navigateTo("/login");
  //     } catch (err) {
  //       console.log("error");
  //     }
  //   }
  //   async SAVECHECKLIST() {
  //     console.log("SaveChecklist function");
  //   }
}

export default new Actions();
