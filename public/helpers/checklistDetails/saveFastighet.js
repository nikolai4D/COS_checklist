export default async function (e) {
    let fastighetDOM = document.getElementById('addChecklistFastighet')

    const sendFastighetToDb = () => {
      // await Actions.SEND_CHECKLIST_DATUM(fastighetDOM.value)
      console.log("saveFastighet", fastighetDOM.value)

    }

    fastighetDOM.addEventListener("change", () => sendFastighetToDb(), { once: true });
}