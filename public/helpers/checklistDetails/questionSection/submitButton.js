import Merchant from "../../../store/Merchant.js";

export default async function (e) {
    console.log("submit function triggered")
    const pictureInput = e.target.parentElement.firstElementChild
    const formData = new FormData();
    formData.append("answer_picture", pictureInput.files[0], "picture");

    const response = await Merchant.CREATE_PICTURE({formData})
    console.log("responseLog from picture req: " + JSON.stringify(response))
}