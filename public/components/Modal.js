

import { State } from "../store/State.js";

export default function (question){

    let note = State.activeChecklist.content.note === undefined ? "" : `<span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">Notering finns</span>
    </span>`;

    return `
    <button type="button" class="btn btn-outline-secondary position-relative" data-bs-toggle="modal" data-bs-target="#modal_${question.id}">🖊
        ${note}
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
                    <label for="modalinput_${question.id}" class="col-form-label">Notering:</label>
                    <textarea class="form-control" id="modalinput_${question.id}"></textarea>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Spara</button>
            </div>
            </div>
        </div>
    </div>`;
}
