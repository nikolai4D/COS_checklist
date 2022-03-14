import Actions from "../store/Actions.js";

export default async function (demandedRoute, event) {
  const routes = [
    { path: "/login" },
    { path: "/logout" },
    { path: "upload-images" },
    { path: "show-image" },
    { path: "delete-image" },
    { path: "addChecklist" },
    // { path: "/register" },
    // { path: "/saveChecklist" },
  ];

  const potentialMatches = routes.map((route) => {
    if (demandedRoute === route.path) {
      console.log(`matching function for ${route.path}`);
    }

    return {
      route: route,
      isMatch: demandedRoute === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    return alert("Request unknown");
  }

  if (match.route.path === "/login") {
    await Actions.LOGIN();
  }
  if (match.route.path === "/logout") {
    await Actions.LOGOUT();
  }

  if (match.route.path === "upload-images") {
    let inputImage = document.getElementById("inputFile");

    const outputImageIcon = () => {
      let buttonForImageDOM = document.getElementById("buttonForImage");
      if (buttonForImageDOM !== null) {
        buttonForImageDOM.remove();
        document.getElementById("deleteImage").remove();
      }
      let buttonForImage = `<button id="buttonForImage" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;"><i class="bi bi-image"  data-function="show-image" ></i></button>`;
      let closeButton = `<i style="cursor: pointer;" id="deleteImage" data-function='delete-image' class="bi bi-x"></i>`;
      document
        .getElementById("labelForInputFile")
        .insertAdjacentHTML("afterend", `${buttonForImage}${closeButton}`);
    };
    inputImage.addEventListener("change", () => outputImageIcon(), {
      once: true,
    });
  }

  if (match.route.path === "show-image") {
    let inputImage = document.getElementById("inputFile");
    if (inputImage.files[0] === undefined) {
      document.getElementById('buttonForImage').remove();
      document.getElementById('deleteImage').remove();
      document.getElementById('inputFile').value = null
    }
    else {
      inputImage.src = URL.createObjectURL(inputImage.files[0])
      window.open(inputImage.src);

    }
  }
  if (match.route.path === "delete-image") {
    document.getElementById("buttonForImage").remove();
    document.getElementById("deleteImage").remove();
    document.getElementById("inputFile").value = null;
  }

  if (match.route.path === "addChecklist") {
    await Actions.ADDCHECKLIST();
  }

  //   if (match.route.path === "/register") {
  //     await Actions.REGISTER();
  //   }
  //   if (match.route.path === "/saveChecklist") {
  //     await Actions.SAVECHECKLIST();
  //   }
}
