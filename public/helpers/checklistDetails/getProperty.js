import {State} from "../../store/State.js";

async function generateDropdownOptions(propertyDOM, areaId){

    let propertyAreaRel = (await State.allChecklistsWithDetails.get()).propertyAreaRel;
    let allProperties = (await State.allChecklistsWithDetails.get()).properties;

    for (const relation of propertyAreaRel){
        if (areaId !== relation.target) continue;
        let propertyId = relation.source
        let property = allProperties.find(property => property.id === propertyId)
        propertyDOM.innerHTML += `<option value="${property.id}">${property.title}</option>`
    }
}
export default async function (e) {

    let addressDOM = document.getElementById('addChecklistAddress');
    addressDOM.innerHTML = "";

    let propertyDOM = document.getElementById('addChecklistProperty');
    propertyDOM.innerHTML = `<option></option>`

    let areaId = document.getElementById('addChecklistArea').value;
    if (areaId === "") return

  await generateDropdownOptions(propertyDOM, areaId);
}

