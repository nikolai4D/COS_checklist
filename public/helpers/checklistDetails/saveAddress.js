export default async function (e) {
  
    let adressDOM = document.getElementById('addChecklistAdress')
    console.log("pressedAdress")

    const sendAdressToDb = () => {
      // await Actions.SEND_CHECKLIST_DATUM(adressDOM.value)
      console.log("saveAdress", adressDOM.value)
    }

    adressDOM.addEventListener("change", () => sendAdressToDb(), { once: true });
}