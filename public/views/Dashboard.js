import Actions from "../store/Actions.js";
import { State } from "../store/State.js";

export default class Dashboard {
  constructor() {
    document.title = "Dashboard";
  }

  async getAllChecklists() {
    await Actions.GET_ALL_CHECKLISTS();
    return State.allChecklists;
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
  
  </tbody>
</table>
            
            </div >
            <button type="button" class="btn btn-info" data-function="addChecklist" style="margin-top: 2em;">+ Rondering</button>
        </div>
        ${JSON.stringify(await this.getAllChecklists())}

        `;
  }
}
