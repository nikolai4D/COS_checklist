import {State} from "../../store/State.js";
import {Librarian} from "../../store/Librarian.js";
import Merchant from "../../store/Merchant.js";
import navigateTo from "../navigateTo.js";


export default async function (e) {

    let activeChecklist = State.activeChecklist.content
    let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === activeChecklist.id);
    if (!existingChecklist){
        for (const answer of activeChecklist.questions){
            for (const question of answer.questions){
                if (question.selectedAnswer){
                    await Merchant.createData({type:Librarian.answer.type, checklistId: activeChecklist.id, questionId: question.id, answerId: question.selectedAnswer})
                }
            }
        }
        console.log("pushed answers to state!", activeChecklist)
        State.allChecklistsWithDetails.content.allChecklistsFormatted.push(activeChecklist);
        navigateTo("/")

        // return;
    }

// function that compares questions and answers from old structure to new structure


// State.allChecklistsWithDetails.content.allChecklistsFormatted.forEach(checklist => {}
// State.activeChecklist.content.questions.forEach(answer => {})
navigateTo("/")

}