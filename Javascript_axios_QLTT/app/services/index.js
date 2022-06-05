function Services(){
    this.arr = [],

    this.getListAPI = function(){
        return axios({
            url: "https://628b995a7886bbbb37bbca17.mockapi.io/api/teacher",
            method: "GET",
        })
    }

    this.postList = function(dataList){
        return axios({
            url: "https://628b995a7886bbbb37bbca17.mockapi.io/api/teacher",
            method: "POST",
            data: dataList,
        })
    }

    this.deleteClient = function(id){
        return axios({
            url: `https://628b995a7886bbbb37bbca17.mockapi.io/api/teacher/${id}`,
            method: "DELETE",
        })
    }

    this.getClientAPI = function(id){
        return axios({
            url: `https://628b995a7886bbbb37bbca17.mockapi.io/api/teacher/${id}`,
            method: "GET",
        })
    }

    this.EditAPI = function(dataEdit, id){
        return axios({
            url: `https://628b995a7886bbbb37bbca17.mockapi.io/api/teacher/${id}`,
            method: "PUT",
            data: dataEdit,
        })
    }
}