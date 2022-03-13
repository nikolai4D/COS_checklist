import { State } from "./State.js";

class Mutations {
  constructor() {}
  async SET_ACCESSTOKEN(newAccessToken) {
    State.accessToken = newAccessToken;
  }

  async SET_NEWCHECKLISTID(newChecklistId) {
    State.newChecklistId = newChecklistId;
  }
}

export default new Mutations();
