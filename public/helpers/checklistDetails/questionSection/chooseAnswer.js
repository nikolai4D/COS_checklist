import { State } from "../../../store/State.js";

export default function (e) {
    let selectedAnswer = e.target.value;
    let selectedQuestion = e.target.parentNode;
    let selectedQuestionGroup = e.target.parentNode.parentNode.parentNode.parentNode.id
    selectedQuestion.parentNode.parentNode.classList.remove("table-success")
    selectedQuestion.parentNode.parentNode.classList.remove("table-danger")

    let activeChecklist = State.activeChecklist.content;
    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroup)
    let question = questionGroup.questions.find(question => question.id === selectedQuestion.id)
    question.selectedAnswer = selectedAnswer;
    let status = question.status = question.answers.preferredAnswer.id === selectedAnswer;
    question.status = status;
    let isNotApplicable = question.answers.possibleAnswers.find(answer => selectedAnswer === answer.id).title === "Ej tillämpbar"
    if (isNotApplicable) { question.status = true; return; }
    if (status) { selectedQuestion.parentNode.parentNode.classList.add("table-success"); return; }
    selectedQuestion.parentNode.parentNode.classList.add("table-danger")
}