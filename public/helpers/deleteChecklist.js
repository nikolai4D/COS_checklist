import Actions from "../store/Actions.js";

export default async function (e) {
    console.log("delete checklist fonction called")
    const checkListId = e.target.parentElement.parentElement.getAttribute("data-id")

    await Actions.DELETE_DATA({type: "checklist", id: checkListId})
}