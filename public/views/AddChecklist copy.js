import { State } from "../store/State.js";
import Actions from "../store/Actions.js";
export default class AddChecklist {
  constructor() {
    document.title = "Add Checklist";
  }

  async getTemplate() {

    let omradenStr = await this.getOmradenStr();

    let frageTyperStr = await this.getFragetyperStr()

    console.log(await frageTyperStr, State.activeChecklistId)

    return `<div class="container">
  <button type="button" class="btn btn-success" data-function="/saveChecklist" style="margin-top: 2em; margin-bottom: 2em;">Skicka in</button>
  <button type="button" class="btn btn-danger" data-view="/" style="margin-top: 2em; margin-bottom: 2em;">Tillbaka</button>
  <h3>Ny checklista: ${State.activeChecklistId}</h3>
  <div id="newChecklist" style="margin-top: 2em; margin-bottom: 3em;">

  <div>
    <label for="Datum">Datum</label>
    <input type="date" id="addChecklistDatum" aria-label="Datum" class="form-control" name="Datum" lang="sv" data-function="saveDatum">

  </div>

  <div >
    <label for="area">Område</label>
    <select data-function="saveOmrade" id="addChecklistOmrade" class="form-select" aria-label="Välj område">
      <option data-function="saveOmrade" selected>
      </option>
      ${omradenStr}

    </select>
  </div>

  <div>
    <label for="area">Fastighet</label>
    <select data-function="saveFastighet" id="addChecklistFastighet" id="area" class="form-select" aria-label="Välj fastighet">
      <option selected></option>
    </select>
  </div>

  <div>
    <label for="area">Adress</label>
    <select data-function="saveAdress" id="addChecklistAdress" id="area" class="form-select" multiple aria-label="Adresser">
      <option selected></option>
    </select>
  </div>

</div>

  <hr />
  <h3>Checklistpunker</h3>
  <div>
    <div class="accordion" id="checklistItems">
     ${await frageTyperStr}

    </div>
  </div>

        `;
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

    let allFragetyperArray = await allFragetyper.map(async (fragetyp) => {
      await Actions.GET_ALL_FRAGOR(await fragetyp);

      let allFragor = await (State.allFragor);
      let allFragorArray = await allFragor.map(async (fraga) => {
        return await `<div class="accordion-body">
        <div class="checklistTable" style="margin-top: 4em;">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Kontrollpunkter</th>
                <th scope="col">Önskat resultat</th>
                <th scope="col">Ja/Nej</th>
                <th scope="col">Notering</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>${await fraga.title}</td>
                <td>Ja</td>
                <td>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Ja/Nej
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li class="dropdown-item">Ja</li>
                      <li class="dropdown-item">Nej</li>
                    </ul>
                  </div>
                </td>
                <td>...</td>
                <td> <label data-function="upload-images" id="labelForInputFile" for="inputFile" class="btn btn-outline-secondary"><i class="bi bi-upload"></i></label><input class="form-control" data-function="upload-images" type="file" id="inputFile" style="display:none;">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;
      });

      return await `
      <div class="accordion-item">
        <h2 class="accordion-header" id="${await fragetyp.id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${await fragetyp.id}" aria-expanded="false" aria-controls="collapse-${await fragetyp.id}">
        ${await fragetyp.title}</button>
        </h2>
        <div id="collapse-${await fragetyp.id}" class="accordion-collapse collapse" aria-labelledby="${await fragetyp.id}" data-bs-parent="#checklistItems">
          ${(await allFragorArray).join("")}
        </div>
      </div>
`;
    });
    return (await allFragetyperArray).join("");
  }
}


