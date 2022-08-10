import mutate from "./Mutations.js";

export default  {

    async getAllDataOfType(type){
        let response

        try {
            response = await fetch(`/api/${type}/getAllData`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            console.log("try");
        } catch (err) {
            console.log(err);
            response = err.response;
            console.log("catch");
        }

        return await response.json();
    },

    async getAllDetailedDataOfType(type){

        let response

        try {
            response = await fetch(`/api/${type}/getAllDetailedData`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            console.log("try");
        } catch (err) {
            console.log(err);
            response = err.response;
            console.log("catch");
        }

        return await response.json();

       // mutate.SET_ALL_CHECKLISTS_WITH_DETAILS(responseObject.allChecklistsFormatted);
       // mutate.SET_ALL_AREA(responseObject.areas);
       // mutate.SET_ALL_PROPERTY(responseObject.properties);
       // mutate.SET_ALL_ADDRESS(responseObject.addresses);
       // mutate.SET_ALL_CHECKLIST_ADDRESS_REL(responseObject.checklistAddressRel);
       // mutate.SET_ALL_ADDRESS_PROPERTY_REL(responseObject.addressPropertyRel);
       // mutate.SET_ALL_PROPERTY_AREA_REL(responseObject.propertyAreaRel);
    },

    async getDataById(params){
        let response

        try {
            response = await fetch(`/api/${params.type}/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            console.log("try");
        } catch (err) {
            console.log(err);
            response = err.response;
            console.log("catch");
        }
        return response
    },


    async createData(params){
        let response;

        console.log(params, 'params!!')

        try {
            response = await fetch(`/api/${params.type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(params)
            });
            console.log("try");
        } catch (err) {
            console.log(err);
            response = err.response;
            console.log("catch");
        }
        return await response.json()
    },

    async deleteData(params){

        let response;
        console.log

        try {
            response = await fetch(`/api/${params.type}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(params)
            });
            console.log("try");
        } catch (err) {
            console.log(err);
            response = err.response;
            console.log("catch");
        }

        return await response.json();
    },

    async updateData(params){

        let response;

        try {
            response = await fetch(`/api/${params.type}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(params)
            });
            console.log("try");
        } catch (err) {
            console.log(err);
            response = err.response;
            console.log("catch");
        }

        return await response.json();

    }
}