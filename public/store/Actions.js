//import  from "./Mutations.js";
import navigateTo from "../helpers/navigateTo.js";
// import { stack } from "d3";
import State from "./State.js";
import mutate from "./Mutations.js";

class Actions {
  constructor() {}
  async LOGIN() {
    console.log("Login function");
    const loginForm = document.getElementById("login-form");
    const email = loginForm.email.value;
    const pwd = loginForm.pwd.value;

    try {
      const responseAuth = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, pwd }),
      });

      if (!responseAuth.ok) {
        if (responseAuth.status === 401) {
          alert("Unauthorized");
        }
        throw new Error(
          `status: ${responseAuth.status}, status text: ${responseAuth.statusText}`
        );
      }

      const token = `Bearer ${(await responseAuth.json()).accessToken}`;

      State.accessToken = await token;
      console.log(State, "STATE");
      mutate.SET_STATE(State);
    } catch (err) {
      console.log("error: " + err.message);
    }

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
