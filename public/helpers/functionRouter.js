import Actions from "../store/Actions.js";
import deleteChecklist from "./checklistOverview/deleteChecklist.js";

import uploadImages from "./checklistDetails/questionSection/uploadImages.js";
import showImage from "./checklistDetails/questionSection/showImage.js";
import deleteImage from "./checklistDetails/questionSection/deleteImage.js";
import getProperty from "./checklistDetails/getProperty.js";
import getAddress from "./checklistDetails/getAddress.js";
import saveAddress from "./checklistDetails/saveAddress.js";
import saveAnswers from "./checklistDetails/saveAnswers.js";
import chooseAnswer from "./checklistDetails/questionSection/chooseAnswer.js";
import validateChecklist from "./checklistDetails/validateChecklist.js";
import viewChecklist from "./checklistDetails/viewChecklist.js";
import saveNote from "./checklistDetails/questionSection/saveNote.js";

export default async function (demandedRoute, event) {
  const routes = [
    { path: "/login" },
    { path: "/logout" },
    { path: "upload-images", request: uploadImages },
    { path: "show-image", request: showImage },
    { path: "delete-image", request: deleteImage },
    { path: "getProperty", request: getProperty },
    { path: "getAddress", request: getAddress },
    { path: "saveAddress", request: saveAddress },
    { path: "chooseAnswer", request: chooseAnswer },
    { path: "validateChecklist", request: validateChecklist },
    { path: "saveAnswers", request: saveAnswers },
    { path: "deleteChecklist", request: deleteChecklist },
    { path: "viewChecklist", request: viewChecklist },
    { path: "saveNote", request: saveNote }

    // { path: "/register" },
    // { path: "/saveChecklist" },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: demandedRoute === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) return alert("Request unknown");


  if (match.route.request !== undefined) await match.route.request(event);


  if (match.route.path === "/login") {
    await Actions.LOGIN();
  }
  if (match.route.path === "/logout") {
    await Actions.LOGOUT();
  }

  //   if (match.route.path === "/register") {
  //     await Actions.REGISTER();
  //   }
  //   if (match.route.path === "/saveChecklist") {
  //     await Actions.SAVECHECKLIST();
  //   }
}
