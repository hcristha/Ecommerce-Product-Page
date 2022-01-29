// mostrar menu
function showMenu(){
    let menu = document.querySelector(".js-menu");
    let box = document.querySelector(".js-menu__box");
    menu.style.display = "block";
    box.style.display = "block";

    // se clicar no "x" dentro do menu, vai fechar menu e box
    let close = document.querySelector(".menu__close");
    close.addEventListener("click", function(){
        menu.style.display = "none";
        box.style.display = "none";
    });

    // se clicar fora do menu, ou seja, no box transparente, vai fechar tanto menu quanto box
    box.addEventListener("click", function(){
        menu.style.display = "none";
        box.style.display = "none";
    });
}

// mostrar carrinho
function showCart(){
    
}