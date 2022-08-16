
import Merchant from "../../../store/Merchant.js";
import { State } from "../../../store/State.js";
import { getSpinner, getPointer } from "../../../components/Spinner.js";

export default async function (e) {
    getSpinner()

    const deleteButtonId = e.target.id;
    const questionId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id")
    const imageId = deleteButtonId.split("$")[1]

    removeFromState(e, questionId);
    removeFromDOM(imageId, e, questionId);
    await Merchant.DELETE_PICTURE(imageId)
    getPointer()
}


function removeFromDOM(imageId, e, questionId) {
    document.getElementById(`buttonForImage_$${imageId}`).parentNode.parentNode.innerHTML = `     <label id="labelForInputImage_$${questionId}" data-function="upload-images" for="inputImage_$${questionId}" class="btn btn-outline-secondary">
     <i  class="bi bi-upload"></i>
     </label>
     <input  data-function="upload-images"  type="file" name="asset" accept="image/*" class="form-control"  id="inputImage_$${questionId}" style="display:none;"  >
`
    e.target.remove();
    document.getElementById(`inputImage_$${questionId}`).value = null;
}

function removeFromState(e, questionId) {
    let { question } = getSelectedQuestion(e, questionId);
    delete question.image;
}

function getSelectedQuestion(e, questionId) {
    let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

    let selectedQuestionGroupId = selectedQuestionGroup.id;
    let activeChecklist = State.activeChecklist.content;
    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
    let question = questionGroup.questions.find(question => question.id === questionId);
    return { question };
}


