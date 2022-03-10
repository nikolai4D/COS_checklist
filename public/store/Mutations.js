import State from "./State.js";

class Mutations {
  constructor() {}
  async SET_STATE(newState) {
    State = newState;
  }
}

export default new Mutations();
