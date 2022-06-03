export default  function (question, number) {
  const possibleAnswers = question.answers.possibleAnswers;
  const preferredAnswer = question.answers.preferredAnswer;

  let selectedAnswer = question.selectedAnswer ?? null;
  let backgroundColor= null;
  let selectedAnswerObj = {title: ""};
  let showFirstOption = true;


  const listOfPossibleAnswers = possibleAnswers.map(answer => {
    let isChosenValue = false;

    if (answer.id === selectedAnswer) {
        selectedAnswerObj = answer;
        isChosenValue = true;
        showFirstOption = false;
        }

    return `<option data-function="chooseAnswer" value="${answer.id}" ${isChosenValue? "selected" : ""} class="dropdown-item">${answer.title}</option>`;
    })

    
    if (selectedAnswerObj.title === "N/A" || selectedAnswerObj.title === "") backgroundColor = "";
    else backgroundColor = question.status ? "table-success" : "table-danger"
    selectedAnswerObj = {title: "N/A"};

    let options = [`<option ${showFirstOption? "selected" : ""} disabled>Välj svar</option>`, ...listOfPossibleAnswers].join("");

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