import { State } from "./State.js";

class Mutations {
  constructor() { }
  async SET_ACCESSTOKEN(newAccessToken) {
    State.accessToken = newAccessToken;
  }

  async SET_NEW_CHECKLIST_ID(activeChecklistId) {
    State.activeChecklistId = activeChecklistId;
  }

  async SET_ALL_CHECKLISTS_IDS(allChecklists) {
    State.allChecklists = allChecklists;
  }
}

export default new Mutations();
