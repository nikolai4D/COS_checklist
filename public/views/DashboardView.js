import Merchant from "../store/Merchant.js";
import {Librarian} from "../store/Librarian.js";

import { State } from "../store/State.js";

export default class DashboardView {
  constructor() {
    document.title = "Checklist - Dashboard";
  }

  async checklistsToHTML() {

    let checklists = (await State.allChecklistsWithDetails.get()).allChecklistsFormatted
    let questions = (await State.allQuestionsWithDetails.get())

    let formattedChecklists = checklists.map((checklist, index) => {
      if(!checklist.address){
        checklist.address = {"title" : "-"}
        checklist.property = {"title" : "-"}
        checklist.area = {"title" : "-"}
      }

      let number = index + 1
      return `  
        <tr data-id="${checklist.id}">
          <th scope="row">${number}</th>
          <td>${checklist.createdDate}</td>
          <td>${checklist.area.title}</td>
          <td>${checklist.property.title}</td>
          <td>${checklist.status}</td>
  
          <td><button type="button" class="btn btn-success" data-view="/viewChecklist" >➚</button></td>
          <td><button type="button" class="btn btn-danger" data-function="deleteChecklist" >×</button></td>
        </tr>`})

    return formattedChecklists.join("")
  }

  async getTemplate() {
    console.log({State})
    return `
        <div class="container">
        <button type="button" class="btn btn-info" data-view="/addChecklist" style="margin-top: 2em;">+ Rondering</button>

            <div class="checklistTable" style="margin-top: 4em;">
            <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Datum</th>
                <th scope="col">Område</th>
                <th scope="col">Fastighet</th>
                <th scope="col">Bedömning</th>
              </tr>
            </thead>
            <tbody>
            ${await this.checklistsToHTML()}
            </tbody>
          </table>
            </div >
        </div>
        <br/>
        `;
  }
}
