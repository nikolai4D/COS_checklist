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
      console.log(`view: ${e.target.getAttribute("data-view")}`);
    }
  });

  document.body.addEventListener("change", async (e) => {

        if (e.target.matches("[data-change]")) {
      // e.preventDefault();
      await functionRouter(e.target.getAttribute("data-change"), e);
      console.log(`function: ${e.target.getAttribute("data-change")}`);
    }
  });
  window.addEventListener("load", async (e) => {
    console.log("Window load");
    e.preventDefault();
    await viewRouter();
  });
});

window.addEventListener("popstate", viewRouter());

