import {State} from "../../../store/State.js";

export default function (e) {

let selectedQuestion = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
let selectedQuestionId = selectedQuestion.getAttribute("data-id");
let selectedQuestionGroupId = selectedQuestion.parentNode.id;
let activeChecklist = State.activeChecklist.content;
let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId)
let question = questionGroup.questions.find(question => question.id === selectedQuestionId)

// remove alert if there is no message
let comment = document.getElementById(`commentmessage_${selectedQuestionId}`).value;
console.log(comment);
let commentAlertDOM = document.getElementById(`commentalert_${selectedQuestionId}`)
if (comment === "") {
    if (question.comment) {delete question.comment;} commentAlertDOM.remove(); return;
};

question.comment = comment;
if (commentAlertDOM !== null) return;
let commentButton = document.getElementById(`commentbutton_${selectedQuestionId}`)
commentButton.innerHTML += `<span id="commentalert_${selectedQuestionId}" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"><span class="visually-hidden">Notering finns</span></span>`;

}