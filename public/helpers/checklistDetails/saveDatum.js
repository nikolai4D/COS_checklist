import Actions from "../../store/Actions.js";

export default async function (e) {
    let datumDOM = document.getElementById('addChecklistDatum')

    const sendDatumToDb = async () => {
      await Actions.SEND_CHECKLIST_DATUM(datumDOM.value)
    }

    datumDOM.addEventListener("change", () => sendDatumToDb(), {
      once: true,
    });
}