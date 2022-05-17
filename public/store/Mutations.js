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


  async SET_ALL_CHECKLISTS_WITH_DETAILS(allChecklistsWithDetails) {
    State.allChecklistsWithDetails = allChecklistsWithDetails;
  }

  async SET_ALL_OMRADEN(allOmraden) {
    State.allOmraden = allOmraden;
  }


  async SET_ALL_FASTIGHET(allFastighet) {
    State.allFastighet = allFastighet;
  }



  async SET_ALL_FRAGETYPER(allFragetyper) {
    State.allFragetyper = allFragetyper;
  }

  async SET_ALL_FRAGOR(allFragor) {
    State.allFragor = allFragor;
  }
}

export default new Mutations();
