import Merchant from "../../store/Merchant.js";
import {Librarian} from "../../store/Librarian.js";
import {State} from "../../store/State.js";

export default async function (e) {
  
    let propertyId = document.getElementById('addChecklistProperty').value
    let areaId = document.getElementById('addChecklistArea').value
    var selectedAddresses = [];
    for (const option of document.getElementById('addChecklistAddress').options){
        if (option.selected) {
          selectedAddresses.push(option.value);
        }
    }
    let activeChecklist = State.activeChecklist.content;

    // let activeChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === State.activeChecklist.content.id);
    let activeArea = State.allChecklistsWithDetails.content.areas.find(area => area.id === areaId);
    let activeProperty = State.allChecklistsWithDetails.content.properties.find(area => area.id === propertyId);
    let activeAddress = State.allChecklistsWithDetails.content.addresses.filter(address => selectedAddresses.includes(address.id));

    activeChecklist.property = activeProperty;
    activeChecklist.area = activeArea;
    activeChecklist.address = activeAddress;
    await Merchant.createData({type: Librarian.address.type, checklistId: activeChecklist.id, addressIds: selectedAddresses})
}