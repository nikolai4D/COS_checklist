import { State } from "../../../store/State.js";
import Merchant from "../../../store/Merchant.js";

export default async function (e) {
  let inputImage = e.target;

  inputImage.addEventListener("change", () => outputImageIcon(), {
    once: true,
  })

  const outputImageIcon = async () => {

    const pictureInput = e.target;

    let fragaId = inputImage.id.split("$")[1];
    const formData = new FormData();
    formData.append("asset", pictureInput.files[0], pictureInput.files[0].name);
    formData.append("questionId", fragaId);
    formData.append("checklistId", State.activeChecklist.content.id)


    let pictureInstance = await Merchant.CREATE_PICTURE({ formData })

    let { question } = getSelectedQuestion(e, fragaId);
    question.image = pictureInstance;
    // // console.log(inputImage.files[0], "FILE")
    generateDeleteButton(fragaId);


  };


}


function generateDeleteButton(fragaId) {
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

  document
    .getElementById(`labelForInputImage_$${fragaId}`)
    .insertAdjacentHTML("afterend", `${buttonForImage}${closeButton}`);
}

function getSelectedQuestion(e, fragaId) {
  let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode;

  let selectedQuestionGroupId = selectedQuestionGroup.id;
  let activeChecklist = State.activeChecklist.content;
  let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
  let question = questionGroup.questions.find(question => question.id === fragaId);
  return { question };
}


