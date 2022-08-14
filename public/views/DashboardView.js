import { State } from "../store/State.js";
import { Librarian } from "../store/Librarian.js";

export default class DashboardView {
  constructor() {
    document.title = "Checklist - Dashboard";
  }

  async checklistsToHTML() {

    delete State.activeChecklist.content;

    let checklists = (await State.allChecklistsWithDetails.set()).allChecklistsFormatted
    await State.allQuestionsWithDetails.set();

    let formattedChecklists = checklists.map((checklist, index) => {
      if (!checklist.address) {
        checklist.address = { "title": "-" }
        checklist.property = { "title": "-" }
        checklist.area = { "title": "-" }
      }

      let statushtml;
      let status = Librarian.status.find(lang => lang.eng === checklist.status)

      if (checklist.status === "Approved") {
        statushtml = `<div class="tc alert-success" role="alert">
         ${status.sv}
       </div>`
      }

      else if (checklist.status === "Not approved") {
        statushtml = `<div class="tc alert-danger" role="alert">
        ${status.sv}
      </div>`
      }

      else if (checklist.status === "In progress") {
        statushtml = `<div class="tc alert-warning" role="alert">
      ${status.sv}
    </div>`
      }


      let number = index + 1

      return `  
        <tr data-id="${checklist.id}">
          <th scope="row"><div class="tc">${number}</div></th>
          <td><div class="tc">${new Date(checklist.created).toLocaleDateString('se-SE', { hour12: false }).split(" ")}</div></td>
          <td><div class="tc">${checklist.area.title}</div></td>
          <td><div class="tc">${checklist.property.title}</div></td>
          <td><div class="tc">${checklist.address.title}</div></td>

          <td>${statushtml} </td>
  
          <td><button data-id="${checklist.id}" type="button" class="btn btn-outline-success" data-function="viewChecklist" >➚</button></td>
          <td><button type="button" class="btn btn-outline-danger" data-function="deleteChecklist" >×</button></td>
        </tr>`})

    return formattedChecklists.join("")
  }

  async getTemplate() {
    return `
        <div class="container">
        <button type="button" class="btn btn-outline-info" data-function="viewChecklist" style="margin-top: 2em;">+ Rondering</button>

            <div class="checklistTable" style="margin-top: 4em;">
            <table id="table" class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Datum</th>
                <th scope="col">Område</th>
                <th scope="col">Fastighet</th>
                <th scope="col">Adress</th>

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
