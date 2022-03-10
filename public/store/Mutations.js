import { State } from "./State.js";

class Mutations {
  constructor() {}
  async SET_ACCESSTOKEN(newAccessToken) {
    State.accessToken = newAccessToken;
  }
}

export default new Mutations();
