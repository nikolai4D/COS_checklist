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

        ${JSON.stringify(await this.getAllChecklists())}
        
            <div class="checklistTable" style="margin-top: 4em;">
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Datum</th>
      <th scope="col">Område / Fastighet</th>
      <th scope="col">Bedömning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>2022-03-01</td>
      <td>Område 1 / Fastighet 1</td>
      <td><button type="button" class="btn btn-success" data-view="/viewChecklist" >Godkänd</button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>2022-03-02</td>
      <td>Område 1 / Fastighet 2</td>
      <td><button type="button" class="btn btn-danger"  >Ej Godkänd</button></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>2022-03-03</td>
      <td>Område 1 / Fastighet 3</td>
      <td><button type="button" class="btn btn-danger"  >Ej Godkänd</button></td>
    </tr>
  </tbody>
</table>
            
            </div >
            <button type="button" class="btn btn-info" data-function="addChecklist" style="margin-top: 2em;">+ Rondering</button>
        </div>
        `;
  }
}
