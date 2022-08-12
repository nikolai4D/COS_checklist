
import Merchant from "../../../store/Merchant.js";

export default async function (e) {
    // let buttonForImageId = e.target.id
    // let fragaId = buttonForImageId.split("$")[1]
    // let inputImage = document.getElementById(`inputImage_$${fragaId}`)

    let imageElement = e.target;
    let newDiv = document.createElement('div');

    // console.log("IMAGEID", imageId);

    let imageId = imageElement.id.split("$")[1];

    let imageInstance = await Merchant.GET_PICTURE_BY_NAME(imageId)
    console.log("IMAGEID", imageInstance);

    newDiv.innerHTML = imageInstance.image;

    imageElement.append(newDiv);


    const formData = new FormData();
    formData.append("imageId", pictureInput.files[0], pictureInput.files[0].name);

    inputImage.src = URL.createObjectURL(inputImage.files[0])
    window.open(inputImage.src);
}