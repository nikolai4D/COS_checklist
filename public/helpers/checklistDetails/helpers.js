import {Librarian} from "../../store/Librarian.js";
import Merchant from "../../store/Merchant.js";

export default async function saveAnswers(activeChecklist) {

    for (const answer of activeChecklist.questions){
        for (const question of answer.questions){
            if (question.selectedAnswer){
                await Merchant.createData({type:Librarian.answer.type, checklistId: activeChecklist.id, questionId: question.id, answerId: question.selectedAnswer})
            }
        }
    }
}