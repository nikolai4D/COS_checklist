import Merchant from "./Merchant.js";
import {Librarian} from "./Librarian.js";

class Resource {
    constructor(fetchFunction, fetchParams) {
        this.fetchFunction = fetchFunction
        this.fetchParams = fetchParams
    }

    wasFetched = false
    content = null
    get = async () => {
        if (!this.wasFetched) {
            this.content = await this.fetchFunction(this.fetchParams)
            this.wasFetched = true
        }
        return this.content
    }
}

export const State = {
    accessToken: undefined,
    allChecklistsWithDetails: new Resource(Merchant.getAllDetailedDataOfType, Librarian.checklist.type),
    allQuestionsWithDetails: new Resource(Merchant.getAllDetailedDataOfType, Librarian.question.type),
    activeChecklist: new Resource(Merchant.createData, Librarian.checklist),
};

// allChecklistWithDetails content template:
// [{
//     id: null,
//     area: null,
//     property: null,
//     address: null,
//     status: null,
//     createdDate: null,
//     updatedDate: null,
// }]

