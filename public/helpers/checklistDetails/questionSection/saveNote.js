import { State } from "../../../store/State.js";
import Merchant from "../../../store/Merchant.js";
import { Librarian } from "../../../store/Librarian.js";

export default async function (e) {

    let selectedQuestion = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    let selectedQuestionId = selectedQuestion.getAttribute("data-id");
    let selectedQuestionGroupId = selectedQuestion.parentNode.id;
    let activeChecklist = State.activeChecklist.content;
    let questionsWithComments = activeChecklist.questionsWithComments

    let questionGroup = activeChecklist.questions.find(questionGroup => questionGroup.id === selectedQuestionGroupId)
    let question = questionGroup.questions.find(question => question.id === selectedQuestionId)


    // remove alert if there is no message
    let comment = document.getElementById(`commentmessage_${selectedQuestionId}`).value;
    let commentAlertDOM = document.getElementById(`commentalert_${selectedQuestionId}`)
    let reqBody = { type: Librarian.comment.type, comment, questionId: selectedQuestionId, questionsWithComments, checklistId: activeChecklist.id }
    let existingComments = State.activeChecklist.content.questionsWithComments

    if (comment === "") {

        if (question.comment) {

            await Merchant.DELETE_COMMENT(reqBody)
            existingComments = await removeExistingComment(questionsWithComments, question)
            delete question.comment;
            State.activeChecklist.content.questionsWithComments = existingComments


        }

        commentAlertDOM.remove(); return;
    }

    else if (question.comment) {
        await Merchant.UPDATE_COMMENT(reqBody)
        let questionComment = findExistingComment(questionsWithComments, question)
        questionComment.comment = comment;
        question.comment = comment;

    }
    else {
        let commentInstance = await Merchant.CREATE_COMMENT(reqBody)
        questionsWithComments.push({ question, comment: commentInstance })
        question.comment = comment;

    }


    if (commentAlertDOM !== null) return;
    let commentButton = document.getElementById(`commentbutton_${selectedQuestionId}`)
    commentButton.innerHTML += `<span id="commentalert_${selectedQuestionId}" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"><span class="visually-hidden">Notering finns</span></span>`;

}

function findExistingComment(questionsWithComments, question) {
    return questionsWithComments.find(obj => obj.question.parentId === question.id);
}

function removeExistingComment(questionsWithComments, question) {
    return questionsWithComments.filter(obj => obj.question.parentId !== question.id);
}
