import viewRouter from "./helpers/viewRouter.js";
import functionRouter from "./helpers/functionRouter.js";
import navigateTo from "./helpers/navigateTo.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.body.addEventListener("click", async (e) => {
    if (e.target.matches("[data-function]")) {
      await functionRouter(e.target.getAttribute("data-function"), e);
    }

    if (e.target.matches("[data-view]")) {
      e.preventDefault();
      navigateTo(e.target.getAttribute("data-view"));
      await viewRouter();
    }
  });

  window.addEventListener("load", async (e) => {
    e.preventDefault();
    await viewRouter();
  });
});

window.addEventListener("popstate", viewRouter());
