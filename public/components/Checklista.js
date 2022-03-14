
export default async function (omradenStr, frageTyperStr, checklistId) {

    return `<div class="container">
    <button type="button" class="btn btn-success" data-function="/saveChecklist" style="margin-top: 2em; margin-bottom: 2em;">Skicka in</button>
    <button type="button" class="btn btn-danger" data-view="/" style="margin-top: 2em; margin-bottom: 2em;">Tillbaka</button>
    <h3>Ny checklista: ${checklistId}</h3>
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
};



