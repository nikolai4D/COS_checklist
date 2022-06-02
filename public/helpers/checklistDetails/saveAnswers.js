import {State} from "../../store/State.js";
import navigateTo from "../navigateTo.js";
import {Librarian} from "../../store/Librarian.js";
import Merchant from "../../store/Merchant.js";

export default async function (e) {

    let activeChecklist = State.activeChecklist.content;
    console.log("hello", activeChecklist)
    let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === activeChecklist.id);
    if (!existingChecklist) await Merchant.createData({type:Librarian.answer.type, activeChecklist});
    else await Merchant.updateData({type:Librarian.answer.type, activeChecklist});
    navigateTo("/")
}