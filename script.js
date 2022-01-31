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


// quantidade de itens
var amountItem = document.querySelector(".product__amount-item");
var c = 0; // contador de cliques começa em 0
var amountItemPerma;

onload = function(){ // serve para exibir quantidades de itens permanente
    amountItemPerma = JSON.parse(localStorage.getItem("amountItem")); // acessando quantidade de itens salva e tornando-a definitiva
    if (amountItemPerma == null){ // primeira vez que acessa o site
        amountItemPerma = 0;
    }
    amountItem.innerText = amountItemPerma; // mostrando na tela quantidade de itens definitiva
    if (amountItemPerma !== 0 && amountItemPerma !== null){ // atualizar contador
        c = amountItemPerma;
    }
}

// aumentar quantidade de itens
function increaseAmount(){ // serve para exibir quantidade de itens temporária
    c += 1; // contador incrementa a cada clique
    amountItem.innerText = c; // atualizando quantidade de itens

    localStorage.setItem("amountItem", c); // salvando a nova quantidade
}

// diminuir quantidade de itens
function decreaseAmount(){
    c -= 1; // contador decrementa até 0 a cada clique
    if (c < 0){ // se a quantidade de itens for menor que 0
        c = 0; // sempre vai receber zero caso seja menor que zero
    }
    amountItem.innerText = c; // atualizando quantidade de itens

    localStorage.setItem("amountItem", c); // salvando a nova quantidade
}

var itemsCart = 0; // itens dentro do carrinho começa em zero
// adicionar item no carrinho
function addCart(){
    itemsCart = amountItemPerma; // itens do carrinho recebe a quantidade escolhida pelo usuário
}


// mostrar carrinho
function showCart(){
    let cart = document.querySelector(".js-product__cart");
    // se o carrinho estiver vazio, mostrar parágrafo
    if (amountItemPerma == 0){
        cart.children[1].innerHTML = "<p>Your cart is empty.</p>";
    }
    // se o carrinho tiver de 1 item pra cima mostrar itens
    if (amountItemPerma >= 1){
        for(let i = 0; i = amountItemPerma; i++){
            cart.children[2].innerHTML += "<li>Item 1</li>";
        }
    }

}
