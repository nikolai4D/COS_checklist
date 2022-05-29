export default  function (question, number) {
  const possibleAnswers = question.answers.possibleAnswers
  const preferredAnswer = question.answers.preferredAnswer;
  const listOfPossibleAnswers = possibleAnswers.map(answer => `<option value="${answer.id}" id="$${question.id}" class="dropdown-item">${answer.title}</option>`)
  let options = ['<option selected>Välj svar</option>', ...listOfPossibleAnswers].join("");
    return ` <tr>
    <td>${question.title}</td>
    <td>${preferredAnswer.title}</td>
    <td>
        <select class="form-select" aria-label="dropdownMenuButton1">
            ${options}
        </select>
    </td>
    <td>...</td>
    <td> <label data-function="upload-images" id="labelForInputImage_$${question.id}" for="inputImage_$${question.id}" class="btn btn-outline-secondary"><i class="bi bi-upload"></i></label><input class="form-control" data-function="upload-images" type="file" id="inputImage_$${question.id}" style="display:none;"  accept="image/*" >
    </td>
    </tr>`;
};