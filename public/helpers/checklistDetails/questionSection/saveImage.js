import {State} from "../../../store/State.js";

export default function (e) {
console.log("IMAGE")
    let { selectedQuestionId, question } = getSelectedQuestion(e);

let inputImage = document.getElementById(`inputImage_$${selectedQuestionId}`)

if (inputImage.files[0] === undefined) {
    if (question.image) {delete question.image;} return;
};

question.image = inputImage;

// // remove alert if there is no message
// let comment = document.getElementById(`commentmessage_${selectedQuestionId}`).value;

// let commentAlertDOM = document.getElementById(`commentalert_${selectedQuestionId}`)
// if (comment === "") {
//     if (question.comment) {delete question.comment;} commentAlertDOM.remove(); return;
// };
}

function getSelectedQuestion(e) {
    let selectedQuestion = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    let selectedQuestionId = selectedQuestion.getAttribute("data-id");
    let selectedQuestionGroupId = selectedQuestion.parentNode.id;
    let activeChecklist = State.activeChecklist.content;
    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId);
    let question = questionGroup.questions.find(question => question.id === selectedQuestionId);
    return { selectedQuestionId, question };
}
