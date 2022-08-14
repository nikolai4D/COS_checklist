
import Merchant from "../../../store/Merchant.js";
import { State } from "../../../store/State.js";

export default async function (e) {
    console.log(e)
    let deleteButtonId = e.target.id;
    let questionId = e.target.parentNode.parentNode.getAttribute("data-id")
    let { question } = getSelectedQuestion(e, questionId)
    delete question.image;


    let imageId = deleteButtonId.split("$")[1]
    document.getElementById(`buttonForImage_$${imageId}`).remove();
    e.target.remove()
    // console.log(questionId, document.getElementById(`inputImage_$${questionId}`))
    document.getElementById(`inputImage_$${questionId}`).value = null;

    let activeChecklist = State.activeChecklist.content;
    console.log(activeChecklist, "sTATE")

    await Merchant.DELETE_PICTURE(imageId)

    // console.log(imageId, "imageID")
    // console.log(e.target.parentElement.parentElement)
    // document.getElementById(`buttonForImage_$as_${imageId}`).remove();
    // e.target.remove()
    // document.getElementById(`deleteImage_$${imageId}`).remove();
    // document.getElementById(`inputImage_$${fragaId}`).value = null;
}


function getSelectedQuestion(e, questionId) {
    let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode;

    let selectedQuestionGroupId = selectedQuestionGroup.id;
    let activeChecklist = State.activeChecklist.content;
    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
    let question = questionGroup.questions.find(question => question.id === questionId);
    return { question };
}



