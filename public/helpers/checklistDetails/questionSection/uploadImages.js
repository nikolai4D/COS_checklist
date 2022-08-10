import {State} from "../../../store/State.js";

export default async function (e) {



let inputImage = e.target;
let fragaId = inputImage.id.split("$")[1];
console.log(fragaId)
let { question } = getSelectedQuestion(e, fragaId);
question.image = inputImage;


const outputImageIcon = () => {
  let buttonForImageDOM = document.getElementById(`buttonForImage_$${fragaId}`);
  if (buttonForImageDOM !== null) {
    buttonForImageDOM.remove();
    document.getElementById(`deleteImage_$${fragaId}`).remove();
  }
  let buttonForImage = `
  <button id="buttonForImage_$${fragaId}" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;">
  <i class="bi bi-image" data-function="show-image" id="iconImage_$${fragaId}"></i></button>`;

  let closeButton = `
  <i style="cursor: pointer;" id="deleteImage_$${fragaId}" data-function='delete-image' class="bi bi-x"></i>`;

  console.log(fragaId)
  document
    .getElementById(`labelForInputImage_$${fragaId}`)
    .insertAdjacentHTML("afterend", `${buttonForImage}${closeButton}`);
};
inputImage.addEventListener("change", () => outputImageIcon(), {
  once: true,
})


// // remove alert if there is no message
// let comment = document.getElementById(`commentmessage_${selectedQuestionId}`).value;

// let commentAlertDOM = document.getElementById(`commentalert_${selectedQuestionId}`)
// if (comment === "") {
//     if (question.comment) {delete question.comment;} commentAlertDOM.remove(); return;
// };
}

function getSelectedQuestion(e, fragaId) {
    let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode;
        console.log(selectedQuestionGroup, "selectedQuestionGroup")

    let selectedQuestionGroupId = selectedQuestionGroup.id;
    let activeChecklist = State.activeChecklist.content;
    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
    let question = questionGroup.questions.find(question => question.id === fragaId);
    return { question };
}
