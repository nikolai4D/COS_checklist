import viewRouter from "./viewRouter.js";

export default function navigateTo(url) {
  history.pushState(null, null, url);
  viewRouter();
}
