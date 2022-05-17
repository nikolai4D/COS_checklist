import Actions from "../store/Actions.js";
import deleteChecklist from "./deleteChecklist.js";

export default async function (demandedRoute, event) {
  const routes = [
    { path: "/login" },
    { path: "/logout" },
    { path: "upload-images" },
    { path: "show-image" },
    { path: "delete-image" },
    { path: "addChecklist" },
    { path: "saveDatum" },
    { path: "saveOmrade" },
    { path: "saveFastighet" },
    { path: "saveAdress" },
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


  

  if (!match) {
    return alert("Request unknown");
  }

  if (match.route.request !== undefined) await match.route.request(event);


  if (match.route.path === "/login") {
    await Actions.LOGIN();
  }
  if (match.route.path === "/logout") {
    await Actions.LOGOUT();
  }

  if (match.route.path === "upload-images") {

    let inputImage = event.target;
    let fragaId = inputImage.id.split("$")[1];
    console.log(fragaId)

    const outputImageIcon = () => {
      let buttonForImageDOM = document.getElementById(`buttonForImage_$${fragaId}`);
      if (buttonForImageDOM !== null) {
        buttonForImageDOM.remove();
        document.getElementById(`deleteImage_$${fragaId}`).remove();
      }
      let buttonForImage = `
      <button id="buttonForImage_$${fragaId}" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;">
      <i class="bi bi-image" data-function="show-image" id="iconImage_$${fragaId}"></i></button>`;

      let closeButton = `
      <i style="cursor: pointer;" id="deleteImage_$${fragaId}" data-function='delete-image' class="bi bi-x"></i>`;

      console.log(fragaId)
      document
        .getElementById(`labelForInputImage_$${fragaId}`)
        .insertAdjacentHTML("afterend", `${buttonForImage}${closeButton}`);
    };
    inputImage.addEventListener("change", () => outputImageIcon(), {
      once: true,
    });
  }

  if (match.route.path === "show-image") {
    let buttonForImageId = event.target.id
    console.log(buttonForImageId)
    let fragaId = buttonForImageId.split("$")[1]
    let inputImage = document.getElementById(`inputImage_$${fragaId}`)

    inputImage.src = URL.createObjectURL(inputImage.files[0])
    window.open(inputImage.src);
  }
  if (match.route.path === "delete-image") {
    let deleteButtonId = event.target.id
    let fragaId = deleteButtonId.split("$")[1]
    document.getElementById(`buttonForImage_$${fragaId}`).remove();
    document.getElementById(`deleteImage_$${fragaId}`).remove();
    document.getElementById(`inputImage_$${fragaId}`).value = null;
  }

  if (match.route.path === "addChecklist") {
    await Actions.ADDCHECKLIST();
  }

  if (match.route.path === "saveDatum") {

    let datumDOM = document.getElementById('addChecklistDatum')

    const sendDatumToDb = async () => {
      await Actions.SEND_CHECKLIST_DATUM(datumDOM.value)
    }

    datumDOM.addEventListener("change", () => sendDatumToDb(), {
      once: true,
    });
  }

  if (match.route.path === "saveOmrade") {
    let omradeDOM = document.getElementById('addChecklistOmrade');
    await Actions.SEND_CHECKLIST_OMRADE(omradeDOM.value)
  }

  if (match.route.path === "saveFastighet") {
    let fastighetDOM = document.getElementById('addChecklistFastighet')
    console.log("pressed")

    const sendFastighetToDb = () => {
      // await Actions.SEND_CHECKLIST_DATUM(fastighetDOM.value)
      console.log("saveFastighet", fastighetDOM.value)

    }

    fastighetDOM.addEventListener("change", () => sendFastighetToDb(), { once: true });
  }

  if (match.route.path === "saveAdress") {
    let adressDOM = document.getElementById('addChecklistAdress')
    console.log("pressedAdress")

    const sendAdressToDb = () => {
      // await Actions.SEND_CHECKLIST_DATUM(adressDOM.value)
      console.log("saveAdress", adressDOM.value)
    }

    adressDOM.addEventListener("change", () => sendAdressToDb(), { once: true });
  }


  //   if (match.route.path === "/register") {
  //     await Actions.REGISTER();
  //   }
  //   if (match.route.path === "/saveChecklist") {
  //     await Actions.SAVECHECKLIST();
  //   }
}
