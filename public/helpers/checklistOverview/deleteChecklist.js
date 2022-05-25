import Actions from "../../store/Actions.js";
import {State} from "../../store/State.js";
import navigateTo from "../navigateTo.js";

export default async function (e) {
    console.log("delete checklist fonction called")
    const checkListId = e.target.parentElement.parentElement.getAttribute("data-id")

    const checkList = State.allChecklistsWithDetails.find( el => el.id = checkListId)

    await Actions.DELETE_DATA({type: "checklist", id: checkListId, datumId: checkList.datum.id})

    navigateTo("/")
}