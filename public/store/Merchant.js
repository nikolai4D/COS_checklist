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

       mutate.SET_ALL_CHECKLISTS_WITH_DETAILS(await response.json());
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

    },

    async deleteData(params){

        let response;

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

    }
}