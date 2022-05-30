export default  function (question, number) {
  const possibleAnswers = question.answers.possibleAnswers;
  const preferredAnswer = question.answers.preferredAnswer;

  let selectedAnswer = question.selectedAnswer ?? null;
  let backgroundColor= null;
  let chosenValue = null;
  let noChosenValue = "selected";
  let selectedAnswerObj = null;
//   let noChosenValue = selectedAnswer === null ? "selected" : null;
//   let chosenValue = noChosenValue === null ? "selected" : null;


  const listOfPossibleAnswers = possibleAnswers.map(answer => {
     chosenValue = null;
     noChosenValue = "selected";
     selectedAnswerObj = null;

    if (answer.id === selectedAnswer) {
        selectedAnswerObj = answer;
        chosenValue = "selected"
        noChosenValue = null
        }

    if (selectedAnswerObj && selectedAnswerObj.title === "N/A") backgroundColor = ""
    else backgroundColor = question.status ? "table-success" : "table-danger"

    return `<option data-function="chooseAnswer" value="${answer.id}" ${chosenValue} class="dropdown-item">${answer.title}</option>`
})


  let options = [`<option ${noChosenValue} disabled>Välj svar</option>`, ...listOfPossibleAnswers].join("");

    return ` <tr class="${backgroundColor}" data-id="${question.id}">
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