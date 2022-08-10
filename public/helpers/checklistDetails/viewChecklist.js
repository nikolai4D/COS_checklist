import Merchant from "../../store/Merchant.js";
import {State} from "../../store/State.js";
import navigateTo from "../navigateTo.js";

export default async function (e) {
let id = e.target.getAttribute("data-id");

if (id){
    await State.allChecklistsWithDetails.set();

    let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === id)

    State.activeChecklist.content = existingChecklist;
    let checklist = State.activeChecklist.content;

    checklist.questions = JSON.parse(JSON.stringify(await State.allQuestionsWithDetails.content.questionsDetailed))


    for (const group of checklist.questions){
        for (const question of group.questions) {

            let matchingQuestionToAnswer = existingChecklist.questionsWithAnswers.find(obj =>  obj.question.parentId === question.id)
            if (matchingQuestionToAnswer){
                question.selectedAnswer = matchingQuestionToAnswer.answer.parentId;
                question.status = matchingQuestionToAnswer.answer.title === "N/A" ? null : matchingQuestionToAnswer.answer.title === question.answers.preferredAnswer.title;
                }

            let matchingQuestionToComment = existingChecklist.questionsWithComments.find(obj =>  obj.question.parentId === question.id)
            if (matchingQuestionToComment) question.comment = matchingQuestionToComment.comment.title;

            // let matchingQuestionToPicture = existingChecklist.questionsWithComments.find(obj =>  obj.question.parentId === question.id)
            // if (matchingQuestionToPicture) question.comment = matchingQuestionToPicture.comment.title;

            }
        }
        }
else  {

        await State.activeChecklist.set();
        let checklist = State.activeChecklist.content;
        checklist.questions =  JSON.parse(JSON.stringify(await State.allQuestionsWithDetails.content.questionsDetailed))
        checklist.address = {title: "-"}
        checklist.area = {title: "-"}
        checklist.property = {title: "-"}
        checklist.status = "In progress"
    }

    navigateTo("/detailView")
}