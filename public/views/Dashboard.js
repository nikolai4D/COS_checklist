import Actions from "../store/Actions.js";
import { State } from "../store/State.js";

export default class Dashboard {
  constructor() {
    document.title = "Dashboard";
  }

  async getAllChecklists() {
    // await Actions.GET_ALL_CHECKLISTS();
    await Actions.GET_ALL_CHECKLISTS_WITH_DETAILS();

    let checklists = State.allChecklistsWithDetails;
    let formatedChecklists = checklists.map((checklist, index) => {

      console.log("checkList: " + JSON.stringify(checklist, null, 2))

      if (!checklist.datum) {
        checklist.datum = { title: "-" }
      }
      let number = index + 1
      return `  <tr data-id="${checklist.id}">
        <th scope="row">${number}</th>
        <td>${checklist.datum.title}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>

  <td><button type="button" class="btn btn-success" data-view="/viewChecklist" >edit</button></td>
  <td><button type="button" class="btn btn-danger" data-function="deleteChecklist" >delete</button></td>
</tr>`})

    return formatedChecklists.join("")
  }

  async getTemplate() {
    return `
        <div class="container">

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
            ${await this.getAllChecklists()}

            </tbody>
          </table>
            </div >
            <button type="button" class="btn btn-info" data-function="addChecklist" style="margin-top: 2em;">+ Rondering</button>
        </div>
        <br/>

        `;
  }
}
