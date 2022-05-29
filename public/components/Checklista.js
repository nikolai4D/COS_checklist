
export default function (areasStr, questionsDetailedStr, checklist) {

    return `<div class="container">
    <button type="button" class="btn btn-success" data-function="validateChecklist" style="margin-top: 2em; margin-bottom: 2em;">Skicka in</button>
    <button type="button" class="btn btn-danger" data-function="saveAnswers" style="margin-top: 2em; margin-bottom: 2em;">Tillbaka</button>
    <h3>Ny checklista: ${checklist.id}</h3>
    <div id="newChecklist" style="margin-top: 2em; margin-bottom: 3em;">
  
    <div>
      <label for="Datum">Datum</label>
      <input class="form-control" type="text" placeholder="${new Date(checklist.created).toLocaleString()}" readonly>
  
    </div>
  
    <div >
      <label for="area">Område</label>
      <select data-change="getProperty" id="addChecklistArea" class="form-select" aria-label="Välj område">
        <option selected>
        </option>
        ${areasStr}
      </select>
    </div>
  
    <div>
      <label for="area">Fastighet</label>
      <select data-change="getAddress" id="addChecklistProperty" id="area" class="form-select" aria-label="Välj fastighet">
        <option selected></option>
      </select>
    </div>
  
    <div>
      <label for="area">Adress</label>
      <select data-function="saveAddress" id="addChecklistAddress" id="area" class="form-select" multiple aria-label="Adresser">
        <option selected></option>
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



