export default async function (fraga) {

    return `<div class="accordion-body">
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
};