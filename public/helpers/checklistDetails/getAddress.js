import { State } from "../../store/State.js";

async function generateDropdownOptions(addressDOM, propertyId) {

    let addressPropertyRel = (await State.allChecklistsWithDetails.get()).addressPropertyRel;
    let allAddresses = (await State.allChecklistsWithDetails.get()).addresses;

    let addressesBeforeSort = [];
    for (const relation of addressPropertyRel) {
        if (propertyId !== relation.target) continue;
        let addressId = relation.source;
        let address = allAddresses.find(adress => adress.id === addressId)
        addressesBeforeSort.push(address);
    }
    addressDOM.innerHTML = `<option disabled selected value=""></option>`;

    let addressesSorted = addressesBeforeSort.sort((a, b) => a.title.localeCompare(b.title));
    addressesSorted.forEach(address => addressDOM.innerHTML += `<option data-function="saveAddress" value="${address.id}">${address.title}</option>)`)

}
export default async function (e) {
    let addressDOM = document.getElementById('addChecklistAddress');

    let propertyId = document.getElementById('addChecklistProperty').value;
    if (propertyId === "") return;

    await generateDropdownOptions(addressDOM, propertyId);

}

