import { State } from "../../../store/State.js";
import Merchant from "../../../store/Merchant.js";

export default async function (e) {
  let inputImage = e.target;
  console.log("hello", inputImage)

  const outputImageIcon = () => {

    console.log("submit function triggered")
    // const pictureInput = e.target;
    // const formData = new FormData();

    // formData.append("asset", pictureInput.files[0], pictureInput.files[0].name);

    // const response = Merchant.CREATE_PICTURE({ formData })
    // console.log("responseLog from picture req: " + JSON.stringify(response))

    // let fragaId = inputImage.id.split("$")[1];
    // let { question } = getSelectedQuestion(e, fragaId);

    // const formData = new FormData();

    // formData.append(`asset`, inputImage.files[0], inputImage.files[0].name);
    // question.image = formData;

    // // console.log(inputImage.files[0], "FILE")
    // console.log(question.image.get(`asset`), "hello")

    //   let buttonForImageDOM = document.getElementById(`buttonForImage_$${fragaId}`);
    //   if (buttonForImageDOM !== null) {
    //     buttonForImageDOM.remove();
    //     document.getElementById(`deleteImage_$${fragaId}`).remove();
    //   }
    //   let buttonForImage = `
    // <button id="buttonForImage_$${fragaId}" data-function="show-image" class="btn btn-outline-secondary" style="margin-left: 1em;">
    // <i class="bi bi-image" data-function="show-image" id="iconImage_$${fragaId}"></i></button>`;

    //   let closeButton = `
    // <i style="cursor: pointer;" id="deleteImage_$${fragaId}" data-function='delete-image' class="bi bi-x"></i>`;

    //   document
    //     .getElementById(`labelForInputImage_$${fragaId}`)
    //     .insertAdjacentHTML("afterend", `${buttonForImage}${closeButton}`);


  };
  inputImage.addEventListener("change", () => outputImageIcon(), {
    once: true,
  })


}
