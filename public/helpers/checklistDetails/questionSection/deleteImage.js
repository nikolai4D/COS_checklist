
import Merchant from "../../../store/Merchant.js";

export default async function (e) {
    let deleteButtonId = e.target.id;
    let questionId = e.target.parentElement.parentElement.id.split("$")[1]
    let imageId = deleteButtonId.split("$")[1]
    document.getElementById(`buttonForImage_$${imageId}`).remove();
    e.target.remove()
    await Merchant.DELETE_PICTURE(imageId)

    // console.log(imageId, "imageID")
    // // console.log(e.target.parentElement.parentElement)
    // document.getElementById(`buttonForImage_$as_${imageId}`).remove();
    // e.target.remove()
    // document.getElementById(`deleteImage_$${imageId}`).remove();
    // document.getElementById(`inputImage_$${fragaId}`).value = null;
}