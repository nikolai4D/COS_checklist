//<button type="button" class="btn btn-secondary" style="margin-left: 1em;" data-view="/register">Register</button>

export default class Login {
    constructor() {
        document.title = "Trygghetsrondering - Logga in";
    }

    async getTemplate() {
        return `
        <div class="h-100 row align-items-center">
            <div class="container">
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <i class="fbi bi-card-checklist justify-content-center" style="display: flex; text-align:center; font-size:30px; color:black; margin-top:50px; margin-bottom:50px"></i>
                        <form id="login-form" >
                            <div class="mb-3  justify-content-center" style="display: flex;">
                                <input type="text" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Email" style="width: 300px;">
                            </div>
                            <div class="mb-3 justify-content-center" style="display: flex;">
                                <input type="password" class="form-control" name="pwd" placeholder="Lösenord" style="width: 300px;">
                            </div>
                            <div class="justify-content-center" style="display: flex;" >
                                <button type="button" class="btn btn-primary" data-function="/login">Logga in</button>
                                
                            </div>
                        </form>
                    </div>
                    <div class="col">
                    </div>
                </div>
            </div>
        </div>

        `;
    }
}
