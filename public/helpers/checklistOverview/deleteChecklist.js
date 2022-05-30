import navigateTo from "../navigateTo.js";
import Merchant from "../../store/Merchant.js";
import { State } from "../../store/State.js";

export default async function (e) {
    console.log("delete checklist fonction called")
    const checkListId = e.target.parentElement.parentElement.getAttribute("data-id")

    await Merchant.deleteData({type: "checklist", id: checkListId})
    State.allChecklistsWithDetails.content.allChecklistsFormatted = State.allChecklistsWithDetails.content.allChecklistsFormatted.filter(checklist => checklist.id !== checkListId)

    navigateTo("/")
}