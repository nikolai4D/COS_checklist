import Merchant from "../../store/Merchant.js";
import {Librarian} from "../../store/Librarian.js";

export default async function () {
    console.log(await Merchant.createData(Librarian.checklist))
}