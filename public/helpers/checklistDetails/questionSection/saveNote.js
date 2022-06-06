import {State} from "../../../store/State.js";

export default function (e) {

let selectedQuestion = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
let selectedQuestionId = selectedQuestion.getAttribute("data-id");
let selectedQuestionGroupId = selectedQuestion.parentNode.id;
let activeChecklist = State.activeChecklist.content;
let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId)
let question = questionGroup.questions.find(question => question.id === selectedQuestionId)

// remove alert if there is no message
let note = document.getElementById(`notemessage_${selectedQuestionId}`).value;
let noteAlertDOM = document.getElementById(`notealert_${selectedQuestionId}`)
if (note === "") {
    if (question.note) {delete question.note;} noteAlertDOM.remove(); return;
};

question.note = note;
if (noteAlertDOM !== null) return;
let noteButton = document.getElementById(`notebutton_${selectedQuestionId}`)
noteButton.innerHTML += `<span id="notealert_${selectedQuestionId}" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"><span class="visually-hidden">Notering finns</span></span>`;

}