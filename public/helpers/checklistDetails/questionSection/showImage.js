
import Merchant from "../../../store/Merchant.js";

export default async function (e) {
    let imageElement = e.target;
    let newDiv = document.createElement('div');

    let imageInstanceId = imageElement.id.split("$")[1]
    let imageId = `as_${imageInstanceId}`

    let imageInstance = await Merchant.GET_PICTURE_BY_NAME(imageId)

    // newDiv.innerHTML = imageInstance.image;
    let modalBody = document.getElementById(`modal-body_${imageInstanceId}`)
    modalBody.innerHTML = imageInstance.image

    let imageDOM = modalBody.firstChild
    imageDOM.classList.add("img-fluid")

}