//helpers
import navigateTo from "./navigateTo.js";
import { State } from "../store/State.js";
import handleToken from "./handleToken.js";

//views
import Dashboard from "../views/Dashboard.js";
import Login from "../views/Login.js";
import Register from "../views/Register.js";
import AddChecklist from "../views/AddChecklist.js";
import ViewChecklist from "../views/ViewChecklist.js";
import Navbar from "../components/Navbar.js";

const viewRouter = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/login", view: Login },
    { path: "/register", view: Register },
    { path: "/addChecklist", view: AddChecklist },
    { path: "/viewChecklist", view: ViewChecklist },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  if (match.route.path !== "/login" && match.route.path !== "/register") {
    if (!State.accessToken) {
      return navigateTo("/login");
    }
    console.log(match.route.path, "not login or register");
    const nav = new Navbar();
    document.querySelector("#nav").innerHTML = await nav.getTemplate();
  }

  document.querySelector("#app").innerHTML = await view.getTemplate();
};

export default viewRouter;
