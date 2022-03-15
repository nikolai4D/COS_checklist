export default async function (fraga, number) {

    return ` <tr>
    <th scope="row">${number}</th>
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
    <td> <label data-function="upload-images" id="labelForInputImage_$${fraga.id}" for="inputImage_$${fraga.id}" class="btn btn-outline-secondary"><i class="bi bi-upload"></i></label><input class="form-control" data-function="upload-images" type="file" id="inputImage_$${fraga.id}" style="display:none;"  accept="image/*" >
    </td>
    </tr>`;
};


