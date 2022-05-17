import Actions from "../store/Actions";

export default async function () {
    const checkListId = e.target.parentElement.getAttribute("data-id")

    await Actions.DELETE_DATA({type: "checkList", id: checkListId})
}