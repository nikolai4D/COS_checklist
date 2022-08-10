const { apiCallPost, apiCallGet, apiCallDelete, apiCallPut } = require("../../helpers.js");

async function createInstance(reqBody) {
    return await apiCallPost(reqBody, `/instance/create`)
}

async function createRelInstance(reqBody) {
    return await apiCallPost(reqBody, `/instanceInternalRel/create`)
}

async function readType(id) {
    return (await apiCallGet(`/type?id=${id}`)).data;
}

async function readRelType(reqBody) {
    return await apiCallPost(reqBody, `/typeInternalRel/readRelBySourceAndTarget`)
}

async function deleteInstance(id) {
    await apiCallDelete(`/instance/${id}`);
}


async function createCommentInstance(title) {
    let reqBody = {
            title,
            parentId: process.env.COMMENT_PARENT_ID,
            props: []
        };
    return await createInstance(reqBody);
}

async function createAnswerInstance(answerObj, question) {
    let reqBody = {
            title: answerObj.title,
            parentId: question.selectedAnswer,
            props: []
        };
    return await createInstance(reqBody);
}

async function createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj) {
    let reqBody = {
            title: commentToQuestionRel.data[0].title,
            source: commentInstance.data.id,
            target: questionObj.id,
            parentId: commentToQuestionRel.data[0].id,
            props: []
        };
    return await createRelInstance(reqBody);
}

async function createRelCommentChecklist(commentToChecklistRel, commentInstance, id) {
    let reqBody = {
            title: commentToChecklistRel.data[0].title,
            source: commentInstance.data.id,
            target: id,
            parentId: commentToChecklistRel.data[0].id,
            props: []
        };
    return await createRelInstance(reqBody);
}

async function createRelQuestionChecklist(questionToChecklistRel, questionObj, id) {
    let reqBody = {
            title: questionToChecklistRel.title,
            source: questionObj.id,
            target: id,
            parentId: questionToChecklistRel.id,
            props: []
        };
    return await createRelInstance(reqBody);
}

async function createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel) {
    let reqBody = {
            title: answerToQuestionRel.title,
            source: answerInstance.data.id,
            target: questionObj.id,
            parentId: answerToChecklistRel.id,
            props: []
        };
    return await createRelInstance(reqBody);
}

async function createRelAnswerChecklist(answerToChecklistRel, answerInstance, id) {
    let reqBody = {
            title: answerToChecklistRel.title,
            source: answerInstance.data.id,
            target: id,
            parentId: answerToChecklistRel.id,
            props: []
    };
    return await createRelInstance(reqBody);
}

async function getRelCommentToQuestion(question) {
    let reqBody = {
            sourceId: process.env.COMMENT_PARENT_ID,
            targetId: question.id
        };
    return await readRelType(reqBody);
    }

async function getRelCommentToChecklist() {
    let reqBody = {
            sourceId: process.env.COMMENT_PARENT_ID,
            targetId: process.env.CHECKLIST_PARENT_ID
        };
    return await readRelType(reqBody);
}

async function getRelQuestionToChecklist(question) {
    let reqBody = {
            sourceId: question.id,
            targetId: process.env.CHECKLIST_PARENT_ID
        };
    return (await readRelType(reqBody)).data[0];
}

async function getRelAnswerToQuestion(question) {
    let reqBody = {
            sourceId: question.selectedAnswer,
            targetId: question.id
        };
    return (await readRelType(reqBody)).data[0];
}

async function getRelAnswerToChecklist(question) {
    let reqBody = {
            sourceId: question.selectedAnswer,
            targetId: process.env.CHECKLIST_PARENT_ID
        };

    return (await readRelType(reqBody)).data[0];
}



module.exports = {
    createRelCommentQuestion,
    createRelCommentChecklist,
    createCommentInstance,
    createAnswerInstance,
    createInstance,
    createRelInstance,
    getRelCommentToQuestion,
    getRelCommentToChecklist,
    createRelQuestionChecklist,
    createRelAnswerQuestion,
    createRelAnswerChecklist,
    getRelQuestionToChecklist,
    getRelAnswerToQuestion,
    getRelAnswerToChecklist,
    readType,
    deleteInstance
}

