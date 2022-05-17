import Actions from "../store/Actions.js";
import {State} from "../store/State.js";

export default async function (e) {
    console.log("delete checklist fonction called")
    const checkListId = e.target.parentElement.parentElement.getAttribute("data-id")

    const checkList = State.allChecklistsWithDetails.find( el => el.id = checkListId)

    console.log({checkListId, "datum": checkList.datum.id})
    await Actions.DELETE_DATA({type: "checklist", id: checkListId, datumId: checkList.datum.id})
}