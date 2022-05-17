//import Actions from "../store/Actions.js";

export default class ViewChecklist {
  constructor() {
    document.title = "View Checklist";
  }

  getTemplate() {
    return `
        <div class="container">
        <button type="button" class="btn btn-success" data-function="/saveChecklist" style="margin-top: 2em; margin-bottom: 2em;">Skicka</button>
        <button type="button" class="btn btn-danger" data-view="/" style="margin-top: 2em; margin-bottom: 2em;">Tillbaka</button>
        <div id="newChecklist" style="margin-top: 2em; margin-bottom: 3em;">

        <h3>Checklista</h3>

        <div class="alert alert-success">
        Godkänd
            </div>

        <div >
        <label for="area">Datum</label>
        <input type="text" aria-label="Datum" class="form-control" value="2022-03-01" disabled>
        </div>


        <div >
        <label for="area">Område</label>
        <select disabled id="area" class="form-select" aria-label="Välj område">
        <option selected>Område 1</option>
        </select>
        </div>

        <div>
        <label for="area">Fastighet</label>
        <select disabled id="area" class="form-select" aria-label="Välj fastighet">
        <option selected>Fastighet 1</option>
        </select>
        </div>

        <div>
        <label for="area">Adress</label>
        <select disabled id="area" class="form-select" multiple aria-label="Adresser">
        <option  value="1">Adress 1</option>
        <option  value="2">Adress 2</option>
        </select>
        </div>



        </div>

        <hr />

        <h3>Checklistpunkter</h3>

        <div>
            <div class="accordion" id="checklistItems">
            <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"  aria-controls="collapseOne">
                A. Utemiljö
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#checklistItems">
                <div class="accordion-body">
                <div class="checklistTable" style="margin-top: 4em;">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Kontrollpunkter</th>
                      <th scope="col">Önskat resultat</th>
                      <th scope="col">Ja/Nej</th>
                      <th scope="col">Notering</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Fråga 1</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Fråga 2</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Fråga 3</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                  </div>
            </div>
            </div>
            <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                B. Entreparti
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#checklistItems">
                <div class="accordion-body">
                <div class="checklistTable" style="margin-top: 4em;">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Kontrollpunkter</th>
                      <th scope="col">Önskat resultat</th>
                      <th scope="col">Ja/Nej</th>
                      <th scope="col">Notering</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Fråga 1</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Fråga 2</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Fråga 3</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                </div>
            </div>
            </div>
            <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                C. Trapphus
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#checklistItems">
                <div class="accordion-body">
                <div class="checklistTable" style="margin-top: 4em;">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Kontrollpunkter</th>
                      <th scope="col">Önskat resultat</th>
                      <th scope="col">Ja/Nej</th>
                      <th scope="col">Notering</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Fråga 1</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Fråga 2</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Fråga 3</td>
                      <td>Ja</td>
                      <td>
                        <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Ja/Nej
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item">Ja</li>
                            <li class="dropdown-item">Nej</li>
                          </ul>
                        </div>
                      </td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            </div>
      </div>
        </div>
        </div>
        `;
  }
}
