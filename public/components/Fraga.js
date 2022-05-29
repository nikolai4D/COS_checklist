export default  function (fraga, number) {
  const possibleAnswers = fraga.answers.possibleAnswers
  const preferredAnswer = fraga.answers.preferredAnswer;
  const listOfPossibleAnswers = possibleAnswers.map(answer => `<option value="${answer.id}" id="$${fraga.id}" class="dropdown-item">${answer.title}</option>`)
  let options = ['<option selected>Välj svar</option>', ...listOfPossibleAnswers].join("");
    return ` <tr>
    <td>${fraga.title}</td>
    <td>${preferredAnswer.title}</td>
    <td>
        <select class="form-select" aria-label="dropdownMenuButton1">
            ${options}
        </select>
    </td>
    <td>...</td>
    <td> <label data-function="upload-images" id="labelForInputImage_$${fraga.id}" for="inputImage_$${fraga.id}" class="btn btn-outline-secondary"><i class="bi bi-upload"></i></label><input class="form-control" data-function="upload-images" type="file" id="inputImage_$${fraga.id}" style="display:none;"  accept="image/*" >
    </td>
    </tr>`;
};