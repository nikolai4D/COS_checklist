import {State} from "../../store/State.js";

export default function (e) {

let activeChecklist = State.activeChecklist.content
let selectedAnswers = activeChecklist.questions.filter(question => question.questions.filter(ques => ques.hasOwnProperty("selectedAnswer")).length > 0)
console.log(selectedAnswers)
}