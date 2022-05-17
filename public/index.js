import viewRouter from "./helpers/viewRouter.js";
import functionRouter from "./helpers/functionRouter.js";
import navigateTo from "./helpers/navigateTo.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded");

  document.body.addEventListener("click", async (e) => {
    if (e.target.matches("[data-function]")) {
      // e.preventDefault();
      await functionRouter(e.target.getAttribute("data-function"), e);
      console.log(`function: ${e.target.getAttribute("data-function")}`);
    }

    if (e.target.matches("[data-view]")) {
      console.log("View click event target");
      e.preventDefault();
      navigateTo(e.target.getAttribute("data-view"));
      await viewRouter();
      console.log(`view: ${e.target.getAttribute("data-view")}`);
    }onmessage
  });


  window.addEventListener("load", async (e) => {
    console.log("Window load");
    e.preventDefault();
    await viewRouter();
  });
});

window.addEventListener("popstate", viewRouter());
