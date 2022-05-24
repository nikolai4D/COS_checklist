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

  async SET_ALL_AREA(allArea) {
    State.allAreas = allArea;
  }

  async SET_ALL_PROPERTY(allProperty) {
    State.allProperties = allProperty;
  }
  async SET_ALL_ADDRESS(allAddress) {
    State.allAddresses = allAddress;
  }

  async SET_ALL_AREA(allArea) {
    State.allAreas = allArea;
  }

  async SET_ALL_CHECKLIST_ADDRESS_REL(allChecklistAddressRel) {
    State.allChecklistAddressRel = allChecklistAddressRel;
  }
  async SET_ALL_ADDRESS_PROPERTY_REL(allAddressPropertyRel) {
    State.allAddressPropertyRel = allAddressPropertyRel;
  }
  async SET_ALL_PROPERTY_AREA_REL(allPropertyAreaRel) {
    State.allPropertyAreaRel = allPropertyAreaRel;
  }
}

export default new Mutations();
