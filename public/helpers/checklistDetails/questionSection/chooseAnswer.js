import { State } from "../../../store/State.js";
import Merchant from "../../../store/Merchant.js";
import { Librarian } from "../../../store/Librarian.js";

export default async function (e) {
    let selectedAnswer = e.target.value;
    let selectedQuestion = e.target.parentNode;
    let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode.parentNode.id
    removeRowColor(selectedQuestion);

    let activeChecklist = State.activeChecklist.content;
    let questionsWithAnswers = activeChecklist.questionsWithAnswers ?? []
    let questionGroup = getQuestionGroupTypeObject(activeChecklist, selectedQuestionGroup)
    let question = getQuestionTypeObject(questionGroup, selectedQuestion)
    question.selectedAnswer = selectedAnswer;

    await updateDb({ questionsWithAnswers, questionId: selectedQuestion.id, checklistId: activeChecklist.id, answer: selectedAnswer, type: Librarian.answer.type }, activeChecklist);

    let status = question.status = question.answers.preferredAnswer.id === selectedAnswer;
    question.status = status;
    let isNotApplicable = question.answers.possibleAnswers.find(answer => selectedAnswer === answer.id).title === "Ej tillämpbar"
    if (isNotApplicable) { question.status = true; return; }
    if (status) { selectedQuestion.parentNode.parentNode.classList.add("table-success"); return; }
    selectedQuestion.parentNode.parentNode.classList.add("table-danger")
}

async function updateDb(reqBody) {

    let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === State.activeChecklist.content.id);
    if (!existingChecklist) {
        State.allChecklistsWithDetails.content.allChecklistsFormatted.push(State.activeChecklist.content);
    }

    await Merchant.UPDATE_ANSWER(reqBody);

}

function getQuestionTypeObject(questionGroup, selectedQuestion) {
    return questionGroup.questions.find(question => question.id === selectedQuestion.id);
}

function getQuestionGroupTypeObject(activeChecklist, selectedQuestionGroup) {
    return activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroup);
}

function removeRowColor(selectedQuestion) {
    selectedQuestion.parentNode.parentNode.classList.remove("table-success");
    selectedQuestion.parentNode.parentNode.classList.remove("table-danger");
}
