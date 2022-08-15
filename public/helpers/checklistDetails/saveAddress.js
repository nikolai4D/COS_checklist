import Merchant from "../../store/Merchant.js";
import { Librarian } from "../../store/Librarian.js";
import { State } from "../../store/State.js";

export default async function (e) {

  let propertyId = document.getElementById('addChecklistProperty').value
  let areaId = document.getElementById('addChecklistArea').value
  let addressId = document.getElementById('addChecklistAddress').value


  let activeChecklist = State.activeChecklist.content;
  console.log(State.allChecklistsWithDetails.content)
  // let activeChecklist = State.allChecklistsWithDetails.content.allChecklistsFormatted.find(checklist => checklist.id === State.activeChecklist.content.id);
  let activeArea = State.allChecklistsWithDetails.content.areas.find(area => area.id === areaId);
  let activeProperty = State.allChecklistsWithDetails.content.properties.find(area => area.id === propertyId);
  let activeAddress = State.allChecklistsWithDetails.content.addresses.find(address => address.id === addressId);


  activeChecklist.property = activeProperty;
  activeChecklist.area = activeArea;
  activeChecklist.address = activeAddress;
  await Merchant.createData({ type: Librarian.address.type, checklistId: activeChecklist.id, addressIds: [addressId] })
}