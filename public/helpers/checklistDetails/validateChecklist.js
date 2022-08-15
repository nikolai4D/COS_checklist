import { State } from "../../store/State.js";
import Merchant from "../../store/Merchant.js";
import { Librarian } from "../../store/Librarian.js";
import navigateTo from "../navigateTo.js";
import { getSpinner, getPointer } from "../../../components/Spinner.js";


export default async function (e) {

    let nonSelected = []

    let activeChecklist = State.activeChecklist.content
    for (const answer of activeChecklist.questions) {
        for (const question of answer.questions) {
            if (!question.selectedAnswer) {
                nonSelected.push(question)
            }
        }
    }
    let answeredAddress = typeof activeChecklist.address !== "undefined" && activeChecklist.address.title !== "-";

    if (nonSelected.length > 0) {
        alert("Fyll i följande frågor för att skicka in: " + nonSelected.map(question => question.title).join(", "))
        return
    }
    if (!answeredAddress) {
        alert("Fyll i Område, Fastighet och Adress")
        return
    }

    let isApproved = true;
    for (const answer of activeChecklist.questions) {
        for (const question of answer.questions) {
            if (!question.status) isApproved = false;
        }
    }
    alert(`Checklistan är: ${isApproved ? "Godkänd" : "Ej godkänd"}`)

    getSpinner()
    await Merchant.updateData({ type: Librarian.checklist.type, activeChecklist, isApproved })
    getPointer()
    navigateTo('/')

}