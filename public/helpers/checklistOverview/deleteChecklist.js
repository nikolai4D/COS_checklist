import navigateTo from "../navigateTo.js";
import Merchant from "../../store/Merchant.js";

export default async function (e) {
    console.log("delete checklist fonction called")
    const checkListId = e.target.parentElement.parentElement.getAttribute("data-id")

    await Merchant.deleteData({type: "checklist", id: checkListId})

    navigateTo("/")
}