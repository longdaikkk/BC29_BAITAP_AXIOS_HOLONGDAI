$(window).scroll(function(){
    if ($(this).scrollTop()) {
        document.getElementById('header').className = "sticky";
    } else {
        document.getElementById('header').className = "";
    }
})
