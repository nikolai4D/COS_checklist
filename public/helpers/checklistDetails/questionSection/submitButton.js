import Merchant from "../../../store/Merchant.js";

export default async function (e) {
    console.log("submit function triggered")
    const pictureInput = e.target.previousElementSibling
    console.log(e.target.previousElementSibling, "TARGET")
    const formData = new FormData();

    formData.append("asset", pictureInput.files[0], pictureInput.files[0].name);

    const response = await Merchant.CREATE_PICTURE({ formData })
    console.log("responseLog from picture req: " + JSON.stringify(response))
}