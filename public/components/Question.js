export default  function (question, number) {
  const possibleAnswers = question.answers.possibleAnswers
  const preferredAnswer = question.answers.preferredAnswer;
  const listOfPossibleAnswers = possibleAnswers.map(answer => `<option data-function="chooseAnswer" value="${answer.id}" class="dropdown-item">${answer.title}</option>`)
  let options = ['<option disabled selected>Välj svar</option>', ...listOfPossibleAnswers].join("");
    return ` <tr data-id="${question.id}">
    <td>${question.title}</td>
    <td>${preferredAnswer.title}</td>
    <td>
        <select id="${question.id}" class="form-select" aria-label="dropdownMenuButton1">
            ${options}
        </select>
    </td>
    <td>...</td>
    <td> <label data-function="upload-images" id="labelForInputImage_$${question.id}" for="inputImage_$${question.id}" class="btn btn-outline-secondary"><i class="bi bi-upload"></i></label><input class="form-control" data-function="upload-images" type="file" id="inputImage_$${question.id}" style="display:none;"  accept="image/*" >
    </td>
    </tr>`;
};