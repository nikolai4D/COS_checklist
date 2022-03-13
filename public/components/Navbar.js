export default class Navbar {
  cconstructor() {}

  async getTemplate() {
    return `
    <div id="navbar">
    <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" data-link="/"><i class="bi bi-card-checklist" style="margin-right:7px;"></i>Rondering Trygga hus</a>
      <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto navbar-nav-scroll" style="--bs-scroll-height: 100px;">
         
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-secondary" type="button" data-function="/logout">Logout</button>
        </form>
      </div>
    </div>
  </nav>
    </div>
        `;
  }
}
