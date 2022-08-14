import Modal from './Modal.js';
import Merchant from "../../../store/Merchant.js";
import getImageButton from '../helpers/checklistDetails/questionSection/helpers/imageModal.js';


export default function (question, number) {
    const possibleAnswers = question.answers.possibleAnswers;
    const preferredAnswer = question.answers.preferredAnswer;
    possibleAnswers.sort((a, b) => a.title.localeCompare(b.title));

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


    if (selectedAnswerObj.title === "Ej tillämpbar" || selectedAnswerObj.title === "") backgroundColor = "";
    else backgroundColor = question.status ? "table-success" : "table-danger"
    selectedAnswerObj = { title: "Ej tillämpbar" };

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
    <div class="btn-group" role="group" aria-label="First group">
    ${generateDeleteButton(question)}
    </div>
    </td>
    </td>

    </tr>`;
};



{/* <input type="file" name="asset" accept="image/*">
    */}

function generateDeleteButton(question) {

    // let imageElement = e.target;
    // let newDiv = document.createElement('div');





    if (!question.image) return `
  <label id="labelForInputImage_$${question.id}" data-function="upload-images" for="inputImage_$${question.id}" class="btn btn-outline-secondary">
        <i class="bi bi-upload"></i>
    </label>
    <input data-function="upload-images" type="file" name="asset" accept="image/*" class="form-control" id="inputImage_$${question.id}" style="display:none;"  >
    `

    // let imageId = `as_${question.image.id}`

    // let imageInstance = Merchant.GET_PICTURE_BY_NAME(imageId)

    return getImageButton(question.image.id);

}
