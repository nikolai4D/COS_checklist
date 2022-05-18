export default async function (e) {

let inputImage = e.target;
let fragaId = inputImage.id.split("$")[1];

const outputImageIcon = () => {
  let buttonForImageDOM = document.getElementById(`buttonForImage_$${fragaId}`);
  if (buttonForImageDOM !== null) {
    buttonForImageDOM.remove();
    document.getElementById(`deleteImage_$${fragaId}`).remove();
  }
  let buttonForImage = `
  <button id="buttonForImage_$${fragaId}" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;">
  <i class="bi bi-image" data-function="show-image" id="iconImage_$${fragaId}"></i></button>`;

  let closeButton = `
  <i style="cursor: pointer;" id="deleteImage_$${fragaId}" data-function='delete-image' class="bi bi-x"></i>`;

  document
    .getElementById(`labelForInputImage_$${fragaId}`)
    .insertAdjacentHTML("afterend", `${buttonForImage}${closeButton}`);
};
inputImage.addEventListener("change", () => outputImageIcon(), {
  once: true,
})

}