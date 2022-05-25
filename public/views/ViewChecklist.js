//import Actions from "../store/Actions.js";


export default class ViewChecklist {
  constructor() {
    document.title = "Checklist - View Checklist";
  }

  getTemplate() {
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles.css">
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <title>COS</title>
      </head>
      <body>
        <!-- Optional JavaScript; choose one of the two! -->
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <!-- Option 2: Separate Popper and Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
        <div class="container">
          <button type="button" class="btn btn-success" data-function="/saveChecklist" style="margin-top: 2em; margin-bottom: 2em;">Skicka</button>
          <button type="button" class="btn btn-danger" data-view="/" style="margin-top: 2em; margin-bottom: 2em;">Tillbaka</button>
          <div id="newChecklist" style="margin-top: 2em; margin-bottom: 3em;">
            <h3>Checklista</h3>
            <div class="alert alert-success"> Godkänd </div>
            <div>
              <label for="areaone">Datum</label>
              <input type="text" id="areaone" aria-label="Datum" class="form-control" value="2022-03-01" disabled>
            </div>
            <div>
              <label for="areatwo">Område</label>
              <select disabled id="areatwo" class="form-select" aria-label="Välj område">
                <option selected>Område 1</option>
              </select>
            </div>
            <div>
              <label for="areathree">Fastighet</label>
              <select disabled id="areathree" class="form-select" aria-label="Välj fastighet">
                <option selected>Fastighet 1</option>
              </select>
            </div>
            <div>
              <label for="areafour">Adress</label>
              <select disabled id="areafour" class="form-select" multiple aria-label="Adresser">
                <option value="1">Adress 1</option>
                <option value="2">Adress 2</option>
              </select>
            </div>
          </div>
          <hr />
          <h3>Checklistpunkter</h3>
          <div>
            <div class="accordion" id="checklistItems">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> A. Utemiljö </button>
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
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton10" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton10">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextfive" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetextfive"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Fråga 2</td>
                            <td>Ja</td>
                            <td>
                              <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModal2" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabelA2">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextthree" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetextthree"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Fråga 3</td>
                            <td>Ja</td>
                            <td>
                              <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModal3" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel400">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextfour" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetextfour"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> B. Entreparti </button>
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
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal33" tabindex="-1" aria-labelledby="exampleModal33" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel40">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextseven" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetextseven"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Fråga 2</td>
                            <td>Ja</td>
                            <td>
                              <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton5" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal31" tabindex="-1" aria-labelledby="exampleModal31" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel41">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextfour" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="message-text-four"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Fråga 3</td>
                            <td>Ja</td>
                            <td>
                              <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton6" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton6">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                  <li class="dropdown-item">N/A</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal39" tabindex="-1" aria-labelledby="exampleModal39" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel42">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextsix" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetextsix"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> C. Trapphus </button>
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
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton7" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton7">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal37" tabindex="-1" aria-labelledby="exampleModal37" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel43">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="message-text-seven" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="message-text-seven"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Fråga 2</td>
                            <td>Ja</td>
                            <td>
                              <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton8" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton8">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal35" tabindex="-1" aria-labelledby="exampleModal35" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel44">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetextelev" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetextelev"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Fråga 3</td>
                            <td>Ja</td>
                            <td>
                              <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton9" data-bs-toggle="dropdown" aria-expanded="false"> Ja/Nej </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton9">
                                  <li class="dropdown-item">Ja</li>
                                  <li class="dropdown-item">Nej</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-notering mb1 bg-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ja!</button>
                              <div class="modal fade" id="exampleModal36" tabindex="-1" aria-labelledby="exampleModal36" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel45">Ny notering</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="mb-3">
                                          <label for="messagetexttwl" class="col-form-label">Notering:</label>
                                          <textarea class="form-control" id="messagetexttwl"></textarea>
                                        </div>
                                      </form>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Spara</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
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
      </body>
    </html>
        `;
  }
}
