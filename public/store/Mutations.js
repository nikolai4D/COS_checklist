import State from "./State.js";

class Mutations {
  async SET_STATE(newState) {
    State = newState;
  }
}

export default new Mutations();
