import { State } from "../store/State.js";
export default class Navbar {
  cconstructor() { }

  async getTemplate() {
    let userName = JSON.parse(atob(State.accessToken.split('.')[1])).email;
    return `<div id="navbar">
            <nav class="navbar navbar-expand navbar-light bg-light">
             <div class="container-fluid">
             <div class="gotohome"  data-view='/dashboard' >
                    <i class="bi bi-card-checklist" style="margin-right:7px;"></i>Trygghetsrondering</a>
                </div>
                
                <div class="collapse navbar-collapse" id="navbarScroll">
                  <ul class="navbar-nav me-auto navbar-nav-scroll" style="--bs-scroll-height: 100px;"></ul>
                  <form class="d-flex">
                    <ul class="navbar-nav me-auto navbar-nav-scroll">
                      <li class="nav-item">
                    </ul>
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">${userName}</a>
                    </li>
                    <button class="btn btn-outline-secondary" type="button" data-function="/logout">Logga ut</button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        `;
  }
}
