import { State } from "../store/State.js";
import Actions from "../store/Actions.js";
import Checklist from "../components/Checklista.js"
import Fraga from "../components/Fraga.js"
import Fragetyp from "../components/Fragetyp.js"
import Merchant from "../store/Merchant.js";
import {Librarian} from "../store/Librarian.js";
export default class AddChecklist {
  constructor() {
    document.title = "Checklist - Add Checklist";
  }

  async getTemplate() {

    let areasStr = await this.getAreasStr();
    let frageTyperStr = await this.getFragetyperStr()
    let checklistId = State.activeChecklistId

    return `${await Checklist(areasStr, frageTyperStr, checklistId)}`
  }

  async getAreasStr() {

    let allAreas = State.allAreas;
    allAreas.sort((a, b) => a.title.localeCompare(b.title));

    let areasStr = "";
    allAreas.forEach(area => {
      areasStr += `<option  data-function="saveOmrade"  value="${area.id}">${area.title}</option>`;
    });
    return areasStr;
  }

  async getFragetyperStr() {
    await Merchant.getAllDataOfType(Librarian.questionGroup.type)

    let allFragetyper = State.allFragetyper;

    allFragetyper.sort((a, b) => a.title.localeCompare(b.title));

    let allFragetyperArray = await Promise.all(allFragetyper.map(async (fragetyp) => {
      await Actions.GET_ALL_FRAGOR(await fragetyp);

      let allFragor = (State.allFragor);

      allFragor.sort((a, b) => a.title.localeCompare(b.title));

      let allFragorArray = await Promise.all(allFragor.map(async (fraga, index) => {
        let number = index + 1
        return Fraga(fraga, number)
      }))

      return Fragetyp(fragetyp, allFragorArray.join(""))

    }))
    return allFragetyperArray.join("")
  }
}