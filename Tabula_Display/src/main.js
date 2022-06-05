var services = new Services();

function getEle(id) {
    return document.getElementById(id);
}

function getListTeacher() {
    var promise = services.getListProductAPI();
    promise
        .then(function (result) {
            renderListTeacher(result.data);
            console.log(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

getListTeacher();

function renderListTeacher(data) {
    var content = "";
    data.forEach(function (value) {
        if (value.loaiND == "GV") {
            content += `
            <div class="card col-12 col-md-6 col-lg-3 animate__fadeIn animate__animated wow">
                <div class="card_item">
                    <div class="card_img">
                        <img class="card-img-top img-fluid" src="./images/${value.hinhAnh}" alt="Card image">
                    </div>
                    <div class="card-body text-center">
                        <p class="card-country">${value.ngonNgu}</p>
                        <h4 class="card-title">${value.hoTen}</h4>
                        <p class="card-text">${value.moTa}
                        </p>
                    </div>
                </div>
            </div>
    `;
        }
    })

    getEle('listTeacher').innerHTML = content;
}