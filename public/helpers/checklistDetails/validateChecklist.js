import {State} from "../../store/State.js";
import Merchant from "../../store/Merchant.js";
import { Librarian } from "../../store/Librarian.js";
import navigateTo from "../navigateTo.js";


export default async function (e) {

let nonSelected = []

let activeChecklist = State.activeChecklist.content
for (const answer of activeChecklist.questions){
    for (const question of answer.questions){
        if (!question.selectedAnswer){
            nonSelected.push(question)
        }
    }
}
let answeredAddress = activeChecklist.address.title !== "-"

if (nonSelected.length > 0) {
    alert("Fyll i följande frågor för att skicka in: " + nonSelected.map(question => question.title).join(", "))
    return
}
 if (!answeredAddress){
    alert("Fyll i Område, Fastighet och Adress")
    return
}

let isApproved = true;
for (const answer of activeChecklist.questions){
    for (const question of answer.questions){
        if(!question.status) isApproved = false;
    }
}
alert(`Checklist validated to: ${isApproved? "approved" : "not approved"}`)


let existingChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === activeChecklist.id);
if (!existingChecklist) await Merchant.createData({type:Librarian.answer.type, activeChecklist});
else await Merchant.updateData({type:Librarian.answer.type, activeChecklist});
await Merchant.updateData({type: Librarian.checklist.type, activeChecklist, isApproved})

navigateTo('/')

}