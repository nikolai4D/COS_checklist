const { apiCallPost, apiCallGet, apiCallDelete, apiCallPut } = require("../helpers");

async function createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj) {
    let reqBody = {
            title: commentToQuestionRel.data[0].title,
            source: commentInstance.data.id,
            target: questionObj.id,
            parentId: commentToQuestionRel.data[0].id,
            props: [] };
    return await createRelInstance(reqBody, `/instanceInternalRel/create`);
}

async function createRelCommentChecklist(commentToChecklistRel, commentInstance, id) {
    let reqBodyCommentChecklistRel = {
            title: commentToChecklistRel.data[0].title,
            source: commentInstance.data.id,
            target: id,
            parentId: commentToChecklistRel.data[0].id,
            props: []
    };
    return await createRelInstance(reqBodyCommentChecklistRel, `/instanceInternalRel/create`);
}

async function createCommentInstance(question) {
    let reqBodyCreateComment = {
            title: question.comment,
            parentId: process.env.COMMENT_PARENT_ID,
            props: []
    };
    return await createInstance(reqBodyCreateComment);
}

async function createAnswerInstance(answerObj, question) {
    let reqBodyCreateAnswer = {
            title: answerObj.title,
            parentId: question.selectedAnswer,
            props: []
    };
    return await createInstance(reqBodyCreateAnswer);
}

async function createInstance(reqBody) {
    return await apiCallPost(reqBody, `/instance/create`)
}

async function createRelInstance(reqBody) {
    return await apiCallPost(reqBody, `/instanceInternalRel/create`)
}


async function getRelCommentToQuestion(question) {
    let reqBody = {
            sourceId: process.env.COMMENT_PARENT_ID,
            targetId: question.id
        };
    return await apiCallPost(reqBody, `/typeInternalRel/readRelBySourceAndTarget`);
}

async function getRelCommentToChecklist() {
    let reqBody = {
            sourceId: process.env.COMMENT_PARENT_ID,
            targetId: process.env.CHECKLIST_PARENT_ID
        };
    return await apiCallPost(reqBody, `/typeInternalRel/readRelBySourceAndTarget`);
}

async function createRelQuestionChecklist(questionToChecklistRel, questionObj, id) {
    let reqBodyQuestionChecklistRel = {
            title: questionToChecklistRel.title,
            source: questionObj.id, target: id,
            parentId: questionToChecklistRel.id,
            props: []
    };
    await apiCallPost(reqBodyQuestionChecklistRel, `/instanceInternalRel/create`);
}

async function createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel) {
    let reqBodyAnswerQuestionRel = {
            title: answerToQuestionRel.title,
            source: answerInstance.data.id,
            target: questionObj.id,
            parentId: answerToChecklistRel.id,
            props: []
    };
    await apiCallPost(reqBodyAnswerQuestionRel, `/instanceInternalRel/create`);
}

async function createRelAnswerChecklist(answerToChecklistRel, answerInstance, id) {
    let reqBodyAnswerChecklistRel = {
            title: answerToChecklistRel.title,
            source: answerInstance.data.id,
            target: id,
            parentId: answerToChecklistRel.id,
            props: []
    };
    await apiCallPost(reqBodyAnswerChecklistRel, `/instanceInternalRel/create`);
}

async function getRelQuestionToChecklist(question) {
    let reqBody = {
            sourceId: question.id,
            targetId: process.env.CHECKLIST_PARENT_ID
        };

    return (await apiCallPost(reqBody, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
}

async function getRelAnswerToQuestion(question) {
    let reqBody = {
            sourceId: question.selectedAnswer,
            targetId: question.id
        };

    return (await apiCallPost(reqBody, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
}

async function getRelAnswerToChecklist(question) {
    let reqBody = {
            sourceId: question.selectedAnswer,
            targetId: process.env.CHECKLIST_PARENT_ID
        };

    return (await apiCallPost(reqBody, `/typeInternalRel/readRelBySourceAndTarget`)).data[0];
}

async function getType(question) {
    return (await apiCallGet(`/type?id=${question.selectedAnswer}`)).data;
}

module.exports = { createRelCommentQuestion, createRelCommentChecklist, createCommentInstance, createAnswerInstance, createInstance, createRelInstance, getRelCommentToQuestion, getRelCommentToChecklist, getRelCommentToChecklist, createRelQuestionChecklist, createRelAnswerQuestion, createRelAnswerChecklist, getRelQuestionToChecklist, getRelAnswerToQuestion, getRelAnswerToChecklist, getType }