

import { State } from "../store/State.js";

export default function (question){

    let commentAlert = !question.comment ? "" : `<span id="commentalert_${question.id}" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">Noering finns</span>
    </span>`;
    let commentInput = question.comment ?? "" ;
    return `
    <button type="button" id="commentbutton_${question.id}" class="btn btn-outline-secondary position-relative" data-bs-toggle="modal" data-bs-target="#modal_${question.id}">🖊
        ${commentAlert}
    </button>
    <div class="modal fade" id="modal_${question.id}" tabindex="-1" aria-labelledby="modal_${question.id}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_${question.id}">Ny notering</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label for="commentmessage_${question.id}" class="col-form-label">Notering:</label>
                    <textarea class="form-control" id="commentmessage_${question.id}">${commentInput}</textarea>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Stäng</button>
                <button type="button" class="btn btn-primary" data-function="saveNote" data-bs-dismiss="modal">Spara</button>
            </div>
            </div>
        </div>
    </div>`;
}
