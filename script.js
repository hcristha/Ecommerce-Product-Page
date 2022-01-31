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
    let cart = document.querySelector(".js-product__cart");
    // carrinho vazio
    let empty = document.createElement("p");
    empty.innerText = "Your cart is empty";
    cart.appendChild(empty);// aqui, lógica para o carrinho
}

// aumentar quantidade de itens
var c = 0; // contador de cliques

function plusItem(){
    c += 1;
    let amountItem = document.querySelector(".product__amount-item");
    amountItem.innerText = c; // atualizando quantidade de itens

    localStorage.setItem("amountItem", c); // aqui, salvar o novo valor e exibir na tela
}

// adicionar item no carrinho
function addCart(){

}