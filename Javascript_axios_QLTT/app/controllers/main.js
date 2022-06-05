//Khai báo hằng số kiểm tra định dạng
const EMAIL_CHECK = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LETTER_CHECK = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
const DATE_CHECK = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
const PASS_CHECK = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

//Khai báo tạo đối tượng
var services = new Services();
var validation = new Validation();
var dataCheckValid = [];

function getEle(id) {
    return document.getElementById(id);
}

//Lấy thông tin người dùng từ mockIo
function getList() {
    var promise = services.getListAPI();
    promise
        .then(function (result) {
            dataCheckValid = result.data;
            renderList(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

getList();

//Tạo bảng hiển thị thông tin người dùng
function renderList(data) {
    var content = "";
    data.forEach(function (value, i) {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${value.taiKhoan}</td>
                <td>${value.matKhau}</td>
                <td>${value.hoTen}</td>
                <td>${value.email}</td>
                <td>${value.ngonNgu}</td>
                <td>${value.loaiND}</td>
                <td><button class="btn btn-danger" onclick="Xoa(${value.id})">Xóa</button>
                <button class="btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick="Sua(${value.id})">Sửa</button>
                </td>
            </tr>
        `
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}

getEle('btnThemNguoiDung').onclick = function () {
    document.getElementsByClassName('modal-title')[0].innerHTML = "Thêm người dùng";
    document.getElementsByClassName('modal-footer')[0].innerHTML = `<button class="btn btn-info" onclick="addList()">Thêm</button>`;
    getEle('TaiKhoan').disabled = false;

    //reset value input sau khi đã thêm thành công
    resetValueInput();
}

//Check valid
function checkValid(_taiKhoan, _hoTen, _matKhau, _email, _hinhAnh, _loaiND, _ngonNgu, _moTa, check) {
    var isValid = true;

    if (check === 1) {
        isValid &= validation.kiemTraRong(_taiKhoan, "tbTaiKhoan", "(*)Vui lòng không để trống") && validation.kiemTraTrung(_taiKhoan, "tbTaiKhoan", "(*)Tài khoản đã tồn tại", dataCheckValid);
    }

    isValid &= validation.kiemTraRong(_hoTen, "tbHoTen", "(*)Vui lòng không để trống") && validation.kiemTraKyTu(_hoTen, "tbHoTen", "(*)Vui lòng không nhập số và kí tự đặc biệt", LETTER_CHECK);

    isValid &= validation.kiemTraRong(_matKhau, "tbMatKhau", "(*)Vui lòng không để trống") && validation.kiemTraKyTu(_matKhau, "tbMatKhau", "(*) có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số", PASS_CHECK) && validation.kiemTraDoDai(_matKhau, "tbMatKhau", "(*)Vui lòng nhập từ 6 đến 8 kí tự", 6, 8);

    isValid &= validation.kiemTraRong(_email, "tbEmail", "(*)Vui lòng không để trống") && validation.kiemTraKyTu(_email, "tbEmail", "(*)Email sai", EMAIL_CHECK);

    isValid &= validation.kiemTraRong(_hinhAnh, "tbHinhAnh", "(*)Vui lòng không để trống");

    isValid &= validation.kiemTraSelect("loaiNguoiDung", "tbLoaiND", "(*)Vui lòng chọn loại người dùng");

    isValid &= validation.kiemTraSelect("loaiNgonNgu", "tbLoaiNgonNgu", "(*)Vui lòng chọn ngôn ngữ");

    isValid &= validation.kiemTraRong(_moTa, "tbMoTa", "(*)Vui lòng không để trống") && validation.kiemTraDoDai(_moTa, "tbMoTa", "(*)Vui lòng chỉ nhập tối đa 60 kí tự", 0, 60);

    return isValid;
}

//Thêm người dùng
function addList() {
    getEle('TaiKhoan').disabled = false;
    var _taiKhoan = getEle('TaiKhoan').value;
    var _hoTen = getEle('HoTen').value;
    var _matKhau = getEle('MatKhau').value;
    var _email = getEle('Email').value;
    var _hinhAnh = getEle('HinhAnh').value;
    var _loaiND = getEle('loaiNguoiDung').value;
    var _ngonNgu = getEle('loaiNgonNgu').value;
    var _moTa = getEle('MoTa').value;

    var isValid = checkValid(_taiKhoan, _hoTen, _matKhau, _email, _hinhAnh, _loaiND, _ngonNgu, _moTa, 1);
    if (!isValid) {
        return;
    } else {
        var client = new Client(_taiKhoan, _hoTen, _matKhau, _email, _hinhAnh, _loaiND, _ngonNgu, _moTa)

        var promise = services.postList(client);
        promise
            .then(function () {
                getList();
                document.getElementsByClassName('close')[0].click();
                alert('Đã thêm thành công');
            })
            .catch(function (error) {
                console.log(error);
            });


    }
}

//Xóa người dùng
function Xoa(id) {
    var promise = services.deleteClient(id);
    promise
        .then(function () {
            alert('Đã xóa');
            getList();
        })
        .catch(function (error) {
            console.log(error);
        })
}

//Sửa
function Sua(id) {
    document.getElementsByClassName('modal-title')[0].innerHTML = "Chỉnh sửa";
    document.getElementsByClassName('modal-footer')[0].innerHTML = `<button class="btn btn-info" onclick="capNhat(${id})">Cập nhật</button>`;
    getEle('TaiKhoan').disabled = true;
    var promise = services.getClientAPI(id);
    promise
        .then(function (result) {
            console.log(result.data);
            hienThiThongTin(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}


//Hiển thị thông tin để chỉnh sửa
function hienThiThongTin(data) {
    getEle('TaiKhoan').value = data.taiKhoan;
    getEle('HoTen').value = data.hoTen;
    getEle('MatKhau').value = data.matKhau;
    getEle('Email').value = data.email;
    getEle('HinhAnh').value = data.hinhAnh;
    getEle('loaiNguoiDung').value = data.loaiND;
    getEle('loaiNgonNgu').value = data.ngonNgu;
    getEle('MoTa').value = data.moTa;
}

//Cập nhật giá trị mới
function capNhat(id) {
    var _taiKhoan = getEle('TaiKhoan').value;
    var _hoTen = getEle('HoTen').value;
    var _matKhau = getEle('MatKhau').value;
    var _email = getEle('Email').value;
    var _hinhAnh = getEle('HinhAnh').value;
    var _loaiND = getEle('loaiNguoiDung').value;
    var _ngonNgu = getEle('loaiNgonNgu').value;
    var _moTa = getEle('MoTa').value;

    var isValid = checkValid(_taiKhoan, _hoTen, _matKhau, _email, _hinhAnh, _loaiND, _ngonNgu, _moTa, 0);
    if (!isValid) {
        return;
    } else {
        var client = new Client(_taiKhoan, _hoTen, _matKhau, _email, _hinhAnh, _loaiND, _ngonNgu, _moTa)

        var promise = services.EditAPI(client, id);
        promise
            .then(function () {
                getList();
                document.getElementsByClassName('close')[0].click();
                alert('Đã cập nhật thành công');
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}


//Reset các thẻ input
function resetValueInput() {
    getEle('TaiKhoan').value = "";
    getEle('HoTen').value = "";
    getEle('MatKhau').value = "";
    getEle('Email').value = "";
    getEle('HinhAnh').value = "";
    getEle('loaiNguoiDung').value = "Chọn loại người dùng";
    getEle('loaiNgonNgu').value = "Chọn ngôn ngữ";
    getEle('MoTa').value = "";
    getEle('tbTaiKhoan').style.display = "none";
    getEle('tbHoTen').style.display = "none";
    getEle('tbMatKhau').style.display = "none";
    getEle('tbEmail').style.display = "none";
    getEle('tbHinhAnh').style.display = "none";
    getEle('tbLoaiND').style.display = "none";
    getEle('tbLoaiNgonNgu').style.display = "none";
    getEle('tbMoTa').style.display = "none";
}