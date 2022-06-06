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
    <td>
        <button type="button" class="btn btn-outline-secondary position-relative" data-bs-toggle="modal" data-bs-target="#modal_${question.id}">🖊
        <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
      </span>
      </button>
        <div class="modal fade" id="modal_${question.id}" tabindex="-1" aria-labelledby="modal_${question.id}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_${question.id}">Ny notering</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label for="modalinput_${question.id}" class="col-form-label">Notering:</label>
                    <textarea class="form-control" id="modalinput_${question.id}"></textarea>
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
        <td> <label data-function="upload-images" id="labelForInputImage_$${question.id}" for="inputImage_$${question.id}" class="btn btn-outline-secondary"><i class="bi bi-upload"></i></label><input class="form-control" data-function="upload-images" type="file" id="inputImage_$${question.id}" style="display:none;"  accept="image/*" >
        </td>
    </tr>`;
};