import Actions from "../../store/Actions.js";
import {State} from "../../store/State.js";

function generateDropdownOptions(){
    let allFastighet = State.allFastighet;
    allFastighet.sort((a, b) => a.title.localeCompare(b.title));

    let fastighetStr = "";
    allFastighet.forEach(fastighet => {
      fastighetStr += `<option  data-function="saveFastighet"  value="${fastighet.id}">${fastighet.title}</option>`;
    });
    return fastighetStr;
}
export default async function (e) {
    let omradeDOM = document.getElementById('addChecklistOmrade');

    const sendOmradeGetFastighet = async () => {
      await Actions.SEND_CHECKLIST_OMRADE(omradeDOM.value)
      await Actions.GET_ALL_CHECKLIST_FASTIGHET(omradeDOM.value) 
      let fastighetDOM = document.getElementById('addChecklistFastighet');
      fastighetDOM.innerHTML = generateDropdownOptions();
    }

      omradeDOM.addEventListener("change", () => sendOmradeGetFastighet(), {
      once: true,
    });


}