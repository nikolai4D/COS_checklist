
export default function getImageButton(imageId) {
    let closeButton = `
    <i style="cursor: pointer;" id="deleteImage_$${imageId}" data-function='delete-image' class="bi bi-x"></i>`;

    let buttonForImage = `<button type="button" id="buttonForImage_$${imageId}" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;" data-bs-toggle="modal" data-bs-target="#modal_${imageId}" >

    <i class="bi bi-image" data-function="show-image" id="iconImage_$${imageId}"></i></button>

    </button>
        <div class="modal fade" id="modal_${imageId}" tabindex="-1" aria-labelledby="modal_${imageId}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg"">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal_${imageId}"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center" id="modal-body_${imageId}">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Stäng</button>
                    </div>
                </div>
            </div>
        </div>`;
    return { buttonForImage, closeButton };
}

