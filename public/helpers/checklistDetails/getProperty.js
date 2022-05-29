import {State} from "../../store/State.js";


async function generateDropdownOptions(){

    let areaId = document.getElementById('addChecklistOmrade').value;
    if (areaId === "") return

    let propertyAreaRel = (await State.allChecklistsWithDetails.get()).propertyAreaRel;
    let allProperties = (await State.allChecklistsWithDetails.get()).properties;
    document.getElementById('addChecklistFastighet').innerHTML += `<option></option>`

    propertyAreaRel.forEach(relation => {
        if (areaId === relation.target){
        let propertyId = relation.source
        let property = allProperties.find(property => property.id === propertyId)
        document.getElementById('addChecklistFastighet').innerHTML += `<option value="${property.id}">${property.title}</option>`
    }})
}
export default async function (e) {
    let fastighetDOM = document.getElementById('addChecklistFastighet');
    fastighetDOM.innerHTML = ""

  await generateDropdownOptions();

}

