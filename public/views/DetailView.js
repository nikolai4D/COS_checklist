import { State } from "../store/State.js";
import Actions from "../store/Actions.js";
import Checklist from "../components/Checklista.js"
import Fraga from "../components/Fraga.js"
import Fragetyp from "../components/Fragetyp.js"
import Merchant from "../store/Merchant.js";
import {Librarian} from "../store/Librarian.js";
export default class DetailView {
  constructor() {
    document.title = "Checklist - Add Checklist";
  }

  async getTemplate() {

    let checklist = await State.activeChecklist.get();
    console.log(checklist, "Checklist")


    let areasStr = await this.getAreasStr();
    let frageTyperStr = await this.getFragetyperStr()



    let checklistId = checklist.id

    return `${await Checklist(areasStr, frageTyperStr, checklistId)}`
  }

  async getAreasStr() {

    let allAreas = (await State.allChecklistsWithDetails.get()).areas
    // console.log(allAreas, "allAreas")
    allAreas.sort((a, b) => a.title.localeCompare(b.title));

    let areasStr = "";
    allAreas.forEach(area => {
      areasStr += `<option value="${area.id}">${area.title}</option>`;
    });
    return areasStr;
  }

  async getFragetyperStr() {
    let questionGroups = (await State.allQuestionsWithDetails.get()).questionsDetailed;
    console.log(questionGroups)

    // let allFragetyper = State.allFragetyper;

    questionGroups.sort((a, b) => a.title.localeCompare(b.title));

    let allFragetyperArray = questionGroups.map( (questionGroup) => {

      questionGroup.questions.sort((a, b) => a.title.localeCompare(b.title));

      let allFragorArray = questionGroup.questions.map( (question, index) => {
        let number = index + 1
        return Fraga(question, number)
      })

      return Fragetyp(questionGroup, allFragorArray.join(""))

    })
    return allFragetyperArray.join("")
  }
}