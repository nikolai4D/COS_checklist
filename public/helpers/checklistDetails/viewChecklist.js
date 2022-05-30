import {State} from "../../store/State.js";
import navigateTo from "../navigateTo.js";
export default async function (e) {
let id = e.target.getAttribute("data-id");

if (id){
    console.log("old")
    let allQuestions = await State.allQuestionsWithDetails.content.questionsDetailed;

    let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === id)

    State.activeChecklist.content = existingChecklist;
    let checklist = State.activeChecklist.content;

    // // let questionGroups = await State.allQuestionsWithDetails.content;
    checklist.questions = await State.allQuestionsWithDetails.content.questionsDetailed;

    // let questions = questionGroups.questionsDetailed.map(group => group.questions)
    // console.log(questionGroups, existingChecklist, questions)
    // for (const group of checklist.questions){
    //     for (const question of group.questions) {
    //         if (question.selectedAnswer) {navigateTo("/detailView") ;return};
            
    //         let matchingQuestion = question.questionsWithAnwers.find(obj =>  obj.question.parentId === question.id)
    //         if (matchingQuestion){
    //             question.selectedAnswer = matchingQuestion.answer.parentId;
    //             question.status = matchingQuestion.answer.title === "N/A" ? true : matchingQuestion.answer.title === question.answers.preferredAnswer.title;
    //         }
    // }
// }
    }
else  {
    console.log("new")

        await State.activeChecklist.set();
        let checklist = State.activeChecklist.content;
        checklist.questions = await State.allQuestionsWithDetails.content.questionsDetailed;
        checklist.address = {title: "-"}
        checklist.area = {title: "-"}
        checklist.property = {title: "-"}
        checklist.status = "In progress"
        checklist.createdDate = checklist.created;
    }
    console.log(State)

    navigateTo("/detailView")
}