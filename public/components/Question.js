import Modal from './Modal.js';

export default function (question, number) {
    const possibleAnswers = question.answers.possibleAnswers;
    const preferredAnswer = question.answers.preferredAnswer;

    let selectedAnswer = question.selectedAnswer ?? null;
    let backgroundColor = null;
    let selectedAnswerObj = { title: "" };
    let showFirstOption = true;


    const listOfPossibleAnswers = possibleAnswers.map(answer => {
        let isChosenValue = false;

        if (answer.id === selectedAnswer) {
            selectedAnswerObj = answer;
            isChosenValue = true;
            showFirstOption = false;
        }

        return `<option data-function="chooseAnswer" value="${answer.id}" ${isChosenValue ? "selected" : ""} class="dropdown-item">${answer.title}</option>`;
    })


    if (selectedAnswerObj.title === "N/A" || selectedAnswerObj.title === "") backgroundColor = "";
    else backgroundColor = question.status ? "table-success" : "table-danger"
    selectedAnswerObj = { title: "N/A" };

    let options = [`<option ${showFirstOption ? "selected" : ""} disabled>Välj svar</option>`, ...listOfPossibleAnswers].join("");

    return ` <tr class="${backgroundColor}" data-id="${question.id}">
    <td>${question.title}</td>
    <td>${preferredAnswer.title}</td>
    <td>
        <select id="${question.id}" class="form-select" aria-label="dropdownMenuButton1">
            ${options}
        </select>
    </td>
    
            <td>
                ${Modal(question)}
            </td>

    <td>
     <label id="labelForInputImage_$${question.id}" data-function="upload-images" for="inputImage_$${question.id}" class="btn btn-outline-secondary">
     <i  class="bi bi-upload"></i>
     </label>
    ${generateDeleteButton(question)}

     <input  data-function="upload-images"  type="file" name="asset" accept="image/*" class="form-control"  id="inputImage_$${question.id}" style="display:none;"  >

    </td>
    </td>

    </tr>`;
};



{/* <input type="file" name="asset" accept="image/*">
    */}

function generateDeleteButton(question) {
    if (!question.image) return ""

    // let buttonForImageDOM = document.getElementById(`buttonForImage_$${question.id}`);
    // if (buttonForImageDOM !== null) {
    //     buttonForImageDOM.remove();
    //     document.getElementById(`deleteImage_$${question.id}`).remove();
    // }
    let buttonForImage = `
    <button id="buttonForImage_$${question.image.id}" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;">
    <i class="bi bi-image" data-function="show-image" id="iconImage_$as_${question.image.id}"></i></button>`;

    let closeButton = `
    <i style="cursor: pointer;" id="deleteImage_$${question.image.id}" data-function='delete-image' class="bi bi-x"></i>`;


    return `${buttonForImage}${closeButton}`
}
