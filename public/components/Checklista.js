import { State } from '../store/State.js';

export default function (areasStr, questionsDetailedStr, checklist) {
  let selectedAddressStr = "";
  let selectedPropertyStr = "";
  let selectedAreaStr = "";
  let showFirstOption = true;

  if (State.activeChecklist.content.address) {
    showFirstOption = false;
    let address = State.activeChecklist.content.address;
    let area = State.activeChecklist.content.area
    let property = State.activeChecklist.content.property
    selectedAddressStr = `<option disabled selected value="${address.id}">${address.title}</option>`
    //  selectedAddressStr = State.activeChecklist.content.address.map(address => `<option disabled selected value="${address.id}">${address.title}</option>`).join(", ")
    selectedAreaStr = `<option disabled selected value="${area.id}">${area.title}</option>`
    selectedPropertyStr = `<option disabled selected value="${property.id}">${property.title}</option>`
  }
  return `<div class="container">
    <button type="button" class="btn btn-outline-success" data-function="validateChecklist" style="margin-top: 2em; margin-bottom: 2em;">Skicka in</button>
    <button type="button" class="btn btn-outline-danger" data-function="saveAnswers" style="margin-top: 2em; margin-bottom: 2em;">Tillbaka</button>
    <h3>Ny checklista: ${checklist.id}</h3>
    <div id="newChecklist" style="margin-top: 2em; margin-bottom: 3em;">
  
    <div>
      <label for="Datum">Datum</label>
      <input class="form-control" type="text" placeholder="${new Date(checklist.created).toLocaleString()}" readonly>
  
    </div>
  
    <div >
      <label for="area">Område</label>
      <select data-change="getProperty" id="addChecklistArea" class="form-select" aria-label="Välj område">
        <option ${showFirstOption ? "selected" : ""}>
        </option>
        ${selectedAreaStr}

        ${areasStr}
      </select>
    </div>
  
    <div>
      <label for="property">Fastighet</label>
      <select data-change="getAddress" id="addChecklistProperty" id="property" class="form-select" aria-label="Välj fastighet">
      ${selectedPropertyStr}
        <option ${showFirstOption ? "selected" : ""}></option>
      </select>
    </div>
  
    <div>
      <label for="address">Adress</label>
      <select data-function="saveAddress" id="addChecklistAddress" id="address" class="form-select" multiple aria-label="Adresser">
      ${selectedAddressStr}

        <option ${showFirstOption ? "selected" : ""}></option>
      </select>
    </div>
  
  </div>
  
    <hr />
    <h3>Checklistpunker</h3>
    <div>
      <div class="accordion" id="checklistItems">
       ${questionsDetailedStr}
  
      </div>
    </div>
  
          `;
};



