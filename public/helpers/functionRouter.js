import Actions from "../store/Actions.js";
import deleteChecklist from "./checklistOverview/deleteChecklist.js";
import addChecklist from "./checklistOverview/addChecklist.js";

import uploadImages from "./checklistDetails/questionSection/uploadImages.js";
import showImage from "./checklistDetails/questionSection/showImage.js";
import deleteImage from "./checklistDetails/questionSection/deleteImage.js";

import saveDatum from "./checklistDetails/saveDatum.js";
import saveOmradeGetFastighet from "./checklistDetails/saveOmradeGetFastighet.js";
import saveFastighet from "./checklistDetails/saveFastighet.js";
import saveAdress from "./checklistDetails/saveAdress.js";

export default async function (demandedRoute, event) {
  const routes = [
    { path: "/login" },
    { path: "/logout" },
    { path: "upload-images", request: uploadImages },
    { path: "show-image", request: showImage },
    { path: "delete-image", request: deleteImage },
    { path: "addChecklist", request: addChecklist },
    { path: "saveDatum", request: saveDatum },
    { path: "saveOmradeGetFastighet", request: saveOmradeGetFastighet },
    { path: "saveFastighet", request: saveFastighet },
    { path: "saveAdress", request: saveAdress },
    { path: "deleteChecklist", request: deleteChecklist },

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
