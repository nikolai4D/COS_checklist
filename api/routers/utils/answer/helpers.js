const { apiCallPut } = require("../../helpers.js");
const api = require("./apiCalls.js")

async function createNewAnswer(questionObj, question, id) {
    questionObj = questionObj ?? await api.getInstance(question.id);

    const answerObj = await api.getType(question.selectedAnswer);
    const answerToChecklistRel = await api.getRelAnswerToChecklist(question);
    const answerToQuestionRel = await api.getRelAnswerToQuestion(question);
    const answerInstance = await api.createAnswerInstance(answerObj, question);

    // create rel between checklist and answer
    await createAnswerRels(answerToChecklistRel, answerInstance, id, answerToQuestionRel, questionObj);
    return answerInstance;

}

async function createNewComment(questionObj, question, id) {
    questionObj = questionObj ?? await api.getInstance(question.id);
    const commentToChecklistRel = await api.getRelCommentToChecklist();
    const commentToQuestionRel = await api.getRelCommentToQuestion(question);
    const commentInstance = await api.createCommentInstance(question.comment);

    // create rel between checklist and comment
    await api.createRelCommentChecklist(commentToChecklistRel, commentInstance, id);
    await api.createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj);
    return commentInstance;
}

async function createQuestionRel(question, questionObj, id) {
    questionObj = questionObj ?? await api.getInstance(question.id);

    const questionToChecklistRel = await api.getRelQuestionToChecklist(question);
    await api.createRelQuestionChecklist(questionToChecklistRel, questionObj, id);
}

async function createAnswerRels(answerToChecklistRel, answerInstance, id, answerToQuestionRel, questionObj) {
    await api.createRelAnswerChecklist(answerToChecklistRel, answerInstance, id);
    await api.createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel);
}

async function updateComment(matchingObjectQuestionComment, question) {
    if (matchingObjectQuestionComment.comment.title !== question.comment) {
        matchingObjectQuestionComment.comment.title = question.comment;
        await apiCallPut({ ...matchingObjectQuestionComment.comment }, `/instanceData/update`);
    }
}

async function deleteExistingAnswers(matchingObject) {
    const sourcesToAnswer = await api.getSourcesToTarget(matchingObject.answer.id);
    if (sourcesToAnswer.links.length > 0) {
        for (const link of sourcesToAnswer.links) {
            await api.deleteInstance(link.source);
        }
    }
    await api.deleteInstance(matchingObject.answer.id);
}

async function deleteComment(existingComment) {
    if (existingComment.comment)
        await api.deleteInstance(existingComment.comment.id);
}

function findExistingAnswer(questionsWithAnswers, question) {
    return questionsWithAnswers.find(obj => obj.question.parentId === question.id);
}

function findExistingComment(questionsWithComments, question) {
    return questionsWithComments.find(obj => obj.question.parentId === question.id);
}

function isExistingAnswerSameAsNewAnswer(existingAnswer, question) {
    return existingAnswer.answer.parentId === question.selectedAnswer;
}


module.exports = {
    createQuestionRel,
    createAnswerRels,
    createNewComment,
    updateComment,
    deleteExistingAnswers,
    findExistingComment,
    deleteComment,
    findExistingAnswer,
    createNewAnswer,
    isExistingAnswerSameAsNewAnswer
}