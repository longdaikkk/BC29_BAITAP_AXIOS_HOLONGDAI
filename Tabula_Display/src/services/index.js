function Services(){
    this.arr = [],
    this.getListProductAPI = function(){
        /**
         * Promise
         *  - Pending (Thoi gian cho)
         *  - resolve (Thanh cong)
         *  - reject (khong thanh cong)
         */ 
        var promise = axios({
            url: "https://628b995a7886bbbb37bbca17.mockapi.io/api/teacher",
            method: "GET",
        });
        return promise;
    }
}