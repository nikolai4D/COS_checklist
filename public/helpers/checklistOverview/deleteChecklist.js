import navigateTo from "../navigateTo.js";
import Merchant from "../../store/Merchant.js";
import { State } from "../../store/State.js";
import { getSpinner, getPointer } from "../../../components/Spinner.js";

export default async function (e) {
    if (confirm('Ta bort checklistan?')) {
        await deleteChecklist(e);
    }
}


async function deleteChecklist(e) {
    getSpinner()
    const checkListId = e.target.parentElement.parentElement.getAttribute("data-id");

    await Merchant.deleteData({ type: "checklist", id: checkListId });
    State.allChecklistsWithDetails.content.allChecklistsFormatted = State.allChecklistsWithDetails.content.allChecklistsFormatted.filter(checklist => checklist.id !== checkListId);
    getPointer()
    navigateTo("/");
}
