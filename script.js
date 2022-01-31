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
var amountItem = document.querySelector(".product__amount-item");
var c = 0; // contador de cliques começa em 0

function plusItem(){
    c += 1; // incrementa a cada clique
    amountItem.innerText = c; // atualizando quantidade de itens

    localStorage.setItem("amountItem", c); // salvar a nova quantidade

    onload = function(){// aqui, qual diferença do onload dentro ou fora da função?
        amountItemPerma = JSON.parse(localStorage.getItem("amountItem")); // acessando quantidade de itens salva e tornando-a definitiva
        if (amountItemPerma == null){ // primeira vez
            amountItemPerma = 0;
        }
        amountItem.innerText = amountItemPerma; // mostrando na tela quantidade de itens definitiva
    
        if (amountItemPerma !== 0 && amountItemPerma !== null){ // atualizar contador
            c = amountItemPerma;
        }
    }
}




// adicionar item no carrinho
function addCart(){

}