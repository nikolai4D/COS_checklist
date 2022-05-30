import Merchant from "../../store/Merchant.js";
import {State} from "../../store/State.js";
import navigateTo from "../navigateTo.js";
export default async function (e) {
let id = e.target.getAttribute("data-id");

if (id){
    console.log("old")
    await State.allChecklistsWithDetails.set();
    console.log(State.allChecklistsWithDetails.content.allChecklistsFormatted)

    let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === id)
    console.log(existingChecklist, id)

    State.activeChecklist.content = existingChecklist;
    let checklist = State.activeChecklist.content;

    checklist.questions = JSON.parse(JSON.stringify(await State.allQuestionsWithDetails.content.questionsDetailed))

    // let questions = questionGroups.questionsDetailed.map(group => group.questions)

    for (const group of checklist.questions){
        for (const question of group.questions) {
            // if (!question.selectedAnswer) {navigateTo("/detailView") ;return};

            let matchingQuestion = existingChecklist.questionsWithAnwers.find(obj =>  obj.question.parentId === question.id)
            if (matchingQuestion){
                question.selectedAnswer = matchingQuestion.answer.parentId;
                question.status = matchingQuestion.answer.title === "N/A" ? null : matchingQuestion.answer.title === question.answers.preferredAnswer.title;
            }
        }
    }
    }
else  {
    console.log("new")

        await State.activeChecklist.set();
        let checklist = State.activeChecklist.content;
        checklist.questions =  JSON.parse(JSON.stringify(await State.allQuestionsWithDetails.content.questionsDetailed))
        checklist.address = {title: "-"}
        checklist.area = {title: "-"}
        checklist.property = {title: "-"}
        checklist.status = "In progress"
    }
    console.log(State, "SECOND SECOND")

    navigateTo("/detailView")
}