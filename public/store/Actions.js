import navigateTo from "../helpers/navigateTo.js";
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

    if (response.status !== 200) {
      alert(`${response.statusText}`);
      navigateTo("/login");
      throw new Error(
        `status: ${response.status}, status text: ${response.statusText}`
      );
    }

    const token = `Bearer ${(await response.json()).accessToken}`;

    mutate.SET_ACCESSTOKEN(token);
    console.log(State, "NEW STATE");

    //Redirection Part
    navigateTo("/");
  }

  async VERIFY() {
    console.log(State.accessToken, "1 State.accessToken!!!!");
    let getHeaders = {
      "Content-Type": "application/json",
      Authorization: await State.accessToken,
    };
    console.log(getHeaders, "getHeaders");

    let responseVerifyToken;

    try {
      responseVerifyToken = await fetch("/api/verify", {
        method: "GET",
        headers: getHeaders,
        credentials: "include",
      });
      console.log("try verify");
    } catch (err) {
      console.log(err);
      responseVerifyToken = err.response;
      console.log("catch verify");
    }

    // console.log(responseVerifyToken, "responseVerifyToken");
    // return "stop";

    if ((await responseVerifyToken.status) !== 200) {
      console.log("!== 200");

      //Clear sessionStorage (accessToken) and set jwt cookie (refreshToken) to expire in the past
      return false;
    }

    return await this.REFRESH();
  }

  async REFRESH() {
    let responseRefreshToken;

    try {
      responseRefreshToken = await fetch("/api/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      responseRefreshToken = err.response;
    }

    let responseRefreshTokenObject = await responseRefreshToken.json();

    if (responseRefreshTokenObject.accessToken === false) {
      //Clear accessToken and set jwt cookie (refreshToken) to expire in the past
      console.log("accessToken = false");
      await this.LOGOUT();
      mutate.SET_ACCESSTOKEN(undefined);
      return false;
    }

    //Set new accessToken
    let tokenNew = `Bearer ${responseRefreshTokenObject.accessToken}`;
    mutate.SET_ACCESSTOKEN(tokenNew);
    console.log("new accessToken: ", tokenNew);
    return true;
  }

  async LOGOUT() {
    console.log("Logout function");
    try {
      await fetch("/api/logout");
      console.log("try logout");
    } catch (err) {
      console.log(err.response);
      console.log("catch logout");
    }

    mutate.SET_ACCESSTOKEN(undefined);
    navigateTo("/login");
  }

  async ADDCHECKLIST() {
    console.log("Add Checklist function");

    let response;

    try {
      response = await fetch("/api/checklist/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }

    const newChecklistId = (await response.json()).id;
    mutate.SET_NEW_CHECKLIST_ID(newChecklistId);

    console.log(State.newChecklistId, "State.newChecklistId");

    navigateTo("/addChecklist");
  }

  async GET_ALL_CHECKLISTS() {
    //localhost:3002/api/instance?parentId=td_1db022c1-a269-4290-832d-be29416455a0

    http: console.log("Get All Checklists function");

    let response;

    try {
      response = await fetch("/api/checklist/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }

    const allChecklists = await response.json();
    mutate.SET_ALL_CHECKLISTS_IDS(allChecklists);

    console.log(State.allChecklists, "State.allChecklists");
  }

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
