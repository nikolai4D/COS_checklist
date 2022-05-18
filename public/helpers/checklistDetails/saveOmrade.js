import Actions from "../../store/Actions.js";

export default async function (e) {
    let omradeDOM = document.getElementById('addChecklistOmrade');
    await Actions.SEND_CHECKLIST_OMRADE(omradeDOM.value)
}