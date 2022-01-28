function showMenu(){
    let menu = document.querySelector(".js-menu");
    menu.style.display = "block";

    let close = document.querySelector(".menu__close");
    close.addEventListener("click", function(){
        menu.style.display = "none";
    })
}