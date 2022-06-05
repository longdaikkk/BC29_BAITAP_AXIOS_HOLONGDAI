function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value !== "") {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemTraKyTu = function (value, errorId, mess, check) {
        if (value.match(check)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemTraDoDai = function (value, errorId, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "inline-block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemTraSelect = function (id, errorId, mess) {
        if (getEle(id).selectedIndex <= 0) {
            getEle(errorId).style.display = "inline-block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    }

    this.kiemTraTrung = function (value, errorId, mess, data) {
        var flag = -1;
        data.forEach(function (item, i) {
            if (value.trim() === item.taiKhoan) {
                flag = 1;
            }
        });
        if(flag != -1){
            getEle(errorId).style.display = "inline-block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    }
}