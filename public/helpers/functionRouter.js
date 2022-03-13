import Actions from "../store/Actions.js";

export default async function (demandedRoute, event) {
  const routes = [
    { path: "/login" },
    { path: "/logout" },
    { path: "upload-images" },
    { path: "show-image" },
    { path: "delete-image" }
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
    let image = document.getElementById('inputFile')

    const outputImageIcon = () => {
      console.log('hello')
      if (image.files[0] === undefined && document.getElementById('buttonForImage') === null) {
        let imageButton = `<button id="buttonForImage" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;"><i class="bi bi-image"  data-function="show-image" ></i></button>`
        let closeButton = `<i style="cursor: pointer;" id="deleteImage" data-function='delete-image' class="bi bi-x"></i>`
        document.getElementById('labelForInputFile').insertAdjacentHTML("afterend", `${imageButton}${closeButton}`);
      }
    }
    image.removeEventListener("change", outputImageIcon())
    image.addEventListener("change", outputImageIcon())
    image.removeEventListener("change", outputImageIcon())

  }

  if (match.route.path === 'show-image') {
    let image = document.getElementById('inputFile')
    if (image.files[0] === undefined) {
      document.getElementById('buttonForImage').remove();
      document.getElementById('deleteImage').remove();
      document.getElementById('inputFile').value = null
    }
    else {
      image.src = URL.createObjectURL(image.files[0])
      window.open(image.src);
    }
  }
  if (match.route.path === 'delete-image') {
    document.getElementById('buttonForImage').remove();
    document.getElementById('deleteImage').remove();
    document.getElementById('inputFile').value = null
  }

  //   if (match.route.path === "/register") {
  //     await Actions.REGISTER();
  //   }
  //   if (match.route.path === "/saveChecklist") {
  //     await Actions.SAVECHECKLIST();
  //   }
}
