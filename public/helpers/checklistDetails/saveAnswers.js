import {State} from "../../store/State.js";
import {Librarian} from "../../store/Librarian.js";
import Merchant from "../../store/Merchant.js";

export default async function (e) {

    let nonSelected = []

    let activeChecklist = State.activeChecklist.content
    for (const answer of activeChecklist.questions){
        for (const question of answer.questions){
            if (question.selectedAnswer){
                await Merchant.createData({type:Librarian.answer.type, checklistId: activeChecklist.id, questionId: question.id, answerId: question.selectedAnswer})
                console.log(question.selectedAnswer)
                
                // create instance of answer
                // create rel between checklist and answer
                // create rel between answer and question
            }
        }
    }
State.activeChecklist.content
// function that compares questions and answers from old structure to new structure


// State.allChecklistsWithDetails.content.allChecklistsFormatted.forEach(checklist => {}
// State.activeChecklist.content.questions.forEach(answer => {})

}