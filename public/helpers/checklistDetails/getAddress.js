import {State} from "../../store/State.js";


async function generateDropdownOptions(){

    let propertyId = document.getElementById('addChecklistFastighet').value;
    if (propertyId === "") return

    let addressPropertyRel = (await State.allChecklistsWithDetails.get()).addressPropertyRel;
    let allAddresses = (await State.allChecklistsWithDetails.get()).addresses;
    document.getElementById('addChecklistAdress').innerHTML += `<option></option>`

    addressPropertyRel.forEach(relation => {
        if (propertyId === relation.target){
        let addressId = relation.source
        let address = allAddresses.find(adress => adress.id === addressId)
        document.getElementById('addChecklistAdress').innerHTML += `<option value="${address.id}">${address.title}</option>`
    }})
}
export default async function (e) {
    let addressDOM = document.getElementById('addChecklistAdress');
    addressDOM.innerHTML = ""

  await generateDropdownOptions();

}

