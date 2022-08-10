const { apiCallPost, apiCallGet, apiCallDelete, apiCallPut } = require("../helpers.js");

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
    console.log(questionObj, 'question')

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


async function createQuestionRel(question, questionObj, id) {
    questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

    const questionToChecklistRel = await getRelQuestionToChecklist(question);
    await createRelQuestionChecklist(questionToChecklistRel, questionObj, id);
}

async function createComment(questionObj, question) {

    const commentToChecklistRel = await getRelCommentToChecklist();
    const commentToQuestionRel = await getRelCommentToQuestion(question);
    const commentInstance = await createCommentInstance(question.comment);
    return { commentToChecklistRel, commentInstance, commentToQuestionRel, questionObj };
}

async function createAnswerRels(answerToChecklistRel, answerInstance, id, answerToQuestionRel, questionObj) {
    await createRelAnswerChecklist(answerToChecklistRel, answerInstance, id);
    await createRelAnswerQuestion(answerToQuestionRel, answerInstance, questionObj, answerToChecklistRel);
}

async function updateDbWithComments(questionObj, questionsWithComments, question, id) {
    let existingComment = findExistingComment(questionsWithComments, question);
    if (question.comment && existingComment)
        await updateComment(existingComment, question);
    else if (question.comment && !existingComment)
        await createNewComment(questionObj, question, id);
    else if (!question.comment && existingComment)
        await deleteComment(existingComment);
}

async function createNewAnswer(questionObj, question, id) {
    questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

    const answerObj = await readType(question.selectedAnswer);
    const answerToChecklistRel = await getRelAnswerToChecklist(question);
    const answerToQuestionRel = await getRelAnswerToQuestion(question);
    const answerInstance = await createAnswerInstance(answerObj, question);

    // create rel between checklist and answer
    await createAnswerRels(answerToChecklistRel, answerInstance, id, answerToQuestionRel, questionObj);
}

function findExistingAnswer(questionsWithAnswers, question) {
    return questionsWithAnswers.find(obj => obj.question.parentId === question.id);
}

async function deleteComment(existingComment) {
    if (existingComment.comment)
        await apiCallDelete(`/instance/${existingComment.comment.id}`);
}

function findExistingComment(questionsWithComments, question) {
    return questionsWithComments.find(obj => obj.question.parentId === question.id);
}

async function deleteExistingAnswers(matchingObject) {
    const sourcesToAnswer = (await apiCallPost({ targetId: matchingObject.answer.id }, `/instance/sourcesToTarget`)).data;
    if (sourcesToAnswer.links.length > 0) {
        for (const link of sourcesToAnswer.links) {
            await apiCallDelete(`/instance/${link.source}`);
        }
    }
    await apiCallDelete(`/instance/${matchingObject.answer.id}`);
}

async function updateComment(matchingObjectQuestionComment, question) {
    if (matchingObjectQuestionComment.comment.title !== question.comment) {
        matchingObjectQuestionComment.comment.title = question.comment;
        await apiCallPut({ ...matchingObjectQuestionComment.comment }, `/instanceData/update`);
    }
}

async function createNewComment(questionObj, question, id) {
    questionObj = questionObj ?? (await apiCallGet(`/instance?parentId=${question.id}`)).data[0];

    let commentToChecklistRel, commentInstance, commentToQuestionRel;
    ({ commentToChecklistRel, commentInstance, commentToQuestionRel } = await createComment(questionObj, question));

    // create rel between checklist and comment
    await createRelCommentChecklist(commentToChecklistRel, commentInstance, id);
    await createRelCommentQuestion(commentToQuestionRel, commentInstance, questionObj);
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
    getRelCommentToChecklist,
    createRelQuestionChecklist,
    createRelAnswerQuestion,
    createRelAnswerChecklist,
    getRelQuestionToChecklist,
    getRelAnswerToQuestion,
    getRelAnswerToChecklist,
    readType,
    createQuestionRel,
    createComment,
    createAnswerRels,
    createNewComment,
    updateComment,
    deleteExistingAnswers,
    findExistingComment,
    deleteComment,
    findExistingAnswer,
    createNewAnswer,
    updateDbWithComments
}