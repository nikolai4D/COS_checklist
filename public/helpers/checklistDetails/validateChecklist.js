import {State} from "../../store/State.js";

export default function (e) {

let nonSelected = []

let activeChecklist = State.activeChecklist.content
for (const answer of activeChecklist.questions){
    for (const question of answer.questions){
        if (!question.selectedAnswer){
            nonSelected.push(question)
        }
    }
}
if (nonSelected.length > 0) {
    alert("Fyll i följande frågor för att skicka in: " + nonSelected.map(question => question.title).join(", "))
    return
}
}