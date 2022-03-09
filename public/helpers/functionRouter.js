import Actions from "../store/Actions.js";

export default async function (demandedRoute, event) {
  const routes = [
    { path: "/login" },
    { path: "/logout" },
    { path: "/register" },
    { path: "/saveChecklist" },
  ];

  const potentialMatches = routes.map((route) => {
    console.log(`matching function for ${route}`);
    return {
      route: route,
      isMatch: demandedRoute === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    return alert("Request unknown");
  }

  if ((match.route.path = "/login")) {
    await Actions.LOGIN();
  }
  if ((match.route.path = "/logout")) {
    await Actions.LOGOUT();
  }
  if ((match.route.path = "/register")) {
    await Actions.REGISTER();
  }
  if ((match.route.path = "/saveChecklist")) {
    await Actions.SAVECHECKLIST();
  }
}
