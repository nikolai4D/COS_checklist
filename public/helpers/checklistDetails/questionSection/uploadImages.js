import { State } from "../../../store/State.js";
import Merchant from "../../../store/Merchant.js";
import getImageButton from "./helpers/imageModal.js"

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
    generateDeleteButton(pictureInstance.id, fragaId);


  };


}


function generateDeleteButton(imageId, fragaId) {
  let buttonForImageDOM = document.getElementById(`buttonForImage_$${imageId}`);
  if (buttonForImageDOM !== null) {
    buttonForImageDOM.remove();
    document.getElementById(`deleteImage_$${imageId}`).remove();
  }




  document
    .getElementById(`labelForInputImage_$${fragaId}`).parentNode.innerHTML = getImageButton(imageId)

}

function getSelectedQuestion(e, questionId) {
  let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode.parentNode;

  let selectedQuestionGroupId = selectedQuestionGroup.id;
  let activeChecklist = State.activeChecklist.content;
  let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
  let question = questionGroup.questions.find(question => question.id === questionId);
  return { question };
}


