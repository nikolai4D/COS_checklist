import navigateTo from "./navigateTo.js";
import State from "../store/State.js";
import Actions from "../store/Actions.js";

export default async function handleToken(tkn) {
  console.log(tkn, "TKN!!!!");
  let getHeaders = {
    "Content-Type": "application/json",
    authorization: tkn,
  };
  try {
    const responseVerifyToken = await fetch("/api/verify", {
      method: "GET",
      headers: getHeaders,
    });
    //AccessToken is FALSE
    console.log(responseVerifyToken, "responseVerifyToken!!!!!");
    if ((await responseVerifyToken.ok) !== true) {
      console.log("!== true");

      //Clear sessionStorage (accessToken) and set jwt cookie (refreshToken) to expire in the past
      State.accessToken = "";
      Actions.LOGOUT();
      return false;
    } else {
      //AccessToken is TRUE, use RefreshToken to get new accessToken
      try {
        let responseRefreshToken = await fetch("/api/refresh", {
          method: "GET",
        });

        let responseRefreshTokenObject = await responseRefreshToken.json();

        if (responseRefreshTokenObject.accessToken === false) {
          //Clear sessionStorage (accessToken) and set jwt cookie (refreshToken) to expire in the past
          State.accessToken = "";
          fetch("/api/logout");
          navigateTo("/login");
          return false;
        } else {
          console.log("new accessToken");
          //Set new accessToken
          let tokenNew = `Bearer ${responseRefreshTokenObject.accessToken}`;

          State.accessToken = tokenNew;
          return true;
        }
      } catch (err) {
        console.log("error");
      }
    }
  } catch (err) {
    console.log("error");
  }
}
