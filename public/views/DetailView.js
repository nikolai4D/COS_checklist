import { State } from "../store/State.js";
import Merchant from "../store/Merchant.js";
import {Librarian} from "../store/Librarian.js";

import Checklist from "../components/Checklista.js"
import Question from "../components/Question.js"
import QuestionGroup from "../components/QuestionGroup.js"

export default class DetailView {
  constructor() {
    document.title = "Checklist - Add Checklist";
  }

  async getTemplate() {

    let checklist = State.activeChecklist.content;

    let areasStr = await this.getAreasStr();
    let questionsDetailedStr = await this.getQuestionsDetailedStr()

    return `${await Checklist(areasStr, questionsDetailedStr, checklist)}`
  }

  async getAreasStr() {

    let allAreas = (await State.allChecklistsWithDetails.get()).areas;
    allAreas.sort((a, b) => a.title.localeCompare(b.title));

    let areasStr = "";
    allAreas.forEach(area => {
      areasStr += `<option value="${area.id}">${area.title}</option>`;
    });
    return areasStr;
  }

  async getQuestionsDetailedStr() {
    let questionsDetailed = State.activeChecklist.content.questions;

    questionsDetailed.sort((a, b) => a.title.localeCompare(b.title));

    let allQuestionsDetailedArray = questionsDetailed.map( (questionGroup) => {

      questionGroup.questions.sort((a, b) => a.title.localeCompare(b.title));

      let allQuestionsArray = questionGroup.questions.map( (question, index) => {
        let number = index + 1
        return Question(question, number)
      })

      return QuestionGroup(questionGroup, allQuestionsArray.join(""))

    })
    return allQuestionsDetailedArray.join("")
  }
}