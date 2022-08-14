
import Merchant from "../../../store/Merchant.js";
import { State } from "../../../store/State.js";

export default async function (e) {
    const deleteButtonId = e.target.id;
    const questionId = e.target.parentNode.parentNode.getAttribute("data-id")
    const imageId = deleteButtonId.split("$")[1]

    removeFromState(e, questionId);
    removeFromClient(imageId, e, questionId);
    await Merchant.DELETE_PICTURE(imageId)

}


function removeFromClient(imageId, e, questionId) {
    document.getElementById(`buttonForImage_$${imageId}`).remove();
    e.target.remove();
    document.getElementById(`inputImage_$${questionId}`).value = null;
}

function removeFromState(e, questionId) {
    let { question } = getSelectedQuestion(e, questionId);
    delete question.image;
}

function getSelectedQuestion(e, questionId) {
    let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode;

    let selectedQuestionGroupId = selectedQuestionGroup.id;
    let activeChecklist = State.activeChecklist.content;
    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
    let question = questionGroup.questions.find(question => question.id === questionId);
    return { question };
}



