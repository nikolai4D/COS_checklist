import { State } from "../store/State.js";
import Actions from "../store/Actions.js";
import Checklist from "../components/Checklista.js"
import Fraga from "../components/Fraga.js"
import Fragetyp from "../components/Fragetyp.js"

export default class AddChecklist {
  constructor() {
    document.title = "Add Checklist";
  }

  async getTemplate() {

    let omradenStr = await this.getOmradenStr();
    let frageTyperStr = await this.getFragetyperStr()
    let checklistId = State.activeChecklistId

    console.log(omradenStr, frageTyperStr, checklistId)
    return `${Checklist(omradenStr, frageTyperStr, checklistId)}`
  }

  async getOmradenStr() {
    await Actions.GET_ALL_CHECKLIST_OMRADE();

    let allOmraden = (State.allOmraden);
    allOmraden.sort((a, b) => a.title.localeCompare(b.title));

    let omradenStr = "";
    allOmraden.forEach(omrade => {
      omradenStr += `<option value="${omrade.id}">${omrade.title}</option>`;
    });
    return omradenStr;
  }

  async getFragetyperStr() {
    await Actions.GET_ALL_FRAGETYPER();

    let allFragetyper = State.allFragetyper;

    allFragetyper.sort((a, b) => a.title.localeCompare(b.title));

    let allFragetyperArray = await Promise.all(allFragetyper.map(async (fragetyp) => {
      await Actions.GET_ALL_FRAGOR(await fragetyp);

      let allFragor = (State.allFragor);
      let allFragorArray = await Promise.all(allFragor.map(async (fraga) => {
        return Fraga(fraga)
      }))

      return Fragetyp(fragetyp, allFragorArray.join(""))

    }))
    return allFragetyperArray.join("")
  }
}


