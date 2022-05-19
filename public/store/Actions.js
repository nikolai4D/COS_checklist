import navigateTo from "../helpers/navigateTo.js";
import { State } from "./State.js";
import mutate from "./Mutations.js";

class Actions {
  constructor() { }
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

    if (response.status !== 200) {
      alert(`${response.statusText}`);
      navigateTo("/login");
      throw new Error(
        `status: ${response.status}, status text: ${response.statusText}`
      );
    }

    const token = `Bearer ${(await response.json()).accessToken}`;

    mutate.SET_ACCESSTOKEN(token);

    //Redirection Part
    navigateTo("/");
  }

  async VERIFY() {
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

    const activeChecklistId = (await response.json()).id;
    mutate.SET_NEW_CHECKLIST_ID(activeChecklistId);
    navigateTo("/addChecklist");
  }

  async GET_ALL_CHECKLISTS() {

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
  }

  async GET_ALL_CHECKLISTS_WITH_DETAILS() {
    console.log("Get All Checklists function");

    let response;

    try {
      response = await fetch("/api/checklist/dashboard", {
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
    mutate.SET_ALL_CHECKLISTS_WITH_DETAILS(allChecklists);
  }

  async SEND_CHECKLIST_DATUM(date) {

    let postBody = JSON.stringify({ datum: date, checklistId: State.activeChecklistId })

    let response;

    try {
      response = await fetch("/api/checklist/create/datum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: postBody
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }
   await response.json()
  }

  async SEND_CHECKLIST_OMRADE(omrade) {
    let postBody = JSON.stringify({ omradeId: omrade, checklistId: State.activeChecklistId })
    let response;

    try {
      response = await fetch("/api/checklist/create/omrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: postBody,
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }
  await response.json()
  }

  async SEND_CHECKLIST_FASTIGHET() {

  }

  async SEND_CHECKLIST_ADRESS() {

  }

  async GET_ALL_CHECKLIST_OMRADE() {


    console.log("Get All Checklists omrade");

    let response;

    try {
      response = await fetch("/api/checklist/read/omrade", {
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
    const allOmraden = await response.json();
    
    mutate.SET_ALL_OMRADEN(allOmraden);
  }


  async GET_ALL_CHECKLIST_FASTIGHET(omrade) {

    let postBody = JSON.stringify({ omradeId: omrade })

    console.log("Get All Checklists fastighet");

    let response;

    try {
      response = await fetch("/api/checklist/read/fastighet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: postBody,

      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }
    const allFastighet = await response.json();
    mutate.SET_ALL_FASTIGHET(allFastighet.data);
  }

  async GET_ALL_CHECKLIST_ADRESS() {
  }


  async GET_ALL_FRAGETYPER() {


    console.log("Get All Checklists fragetyper");

    let response;

    try {
      response = await fetch("/api/checklist/read/fragetyper", {
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
    const allFragetyper = await response.json();
    mutate.SET_ALL_FRAGETYPER(allFragetyper);

  }


  async GET_ALL_FRAGOR(fragetyp) {


    console.log("Get All Checklists fragor");

    let response;

    try {
      response = await fetch("/api/checklist/read/fragor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ targetId: fragetyp.id })
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }
    const allFragor = await response.json();
    mutate.SET_ALL_FRAGOR(allFragor);

  }

  
  async DELETE_DATA(params){
    let response;

    const type = params.type

    //console.log("id in actions: " + params.id)
    try {
      response = await fetch(`/api/${type}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params)
      });
      console.log("try");
    } catch (err) {
      console.log(err);
      response = err.response;
      console.log("catch");
    }

    return await response.json();
  }

}

export default new Actions();
