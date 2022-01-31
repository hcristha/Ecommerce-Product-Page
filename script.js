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
    console.log("Executando...");// aqui, por que não está executando?
    amountItemPerma = JSON.parse(localStorage.getItem("amountItem")); // acessando quantidade de itens salva e tornando-a definitiva
    if (amountItemPerma === null){ // primeira vez que acessa o site
        console.log("Executando...");
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

// itens do carrinho
var itemsCart = 0; // itens dentro do carrinho começa em zero
onload = function(){ // se recarregar a página, pegar itens salvos do carrinho
    itemsCart = JSON.parse(localStorage.getItem("itemsCart"));
    if (itemsCart === null){
        itemsCart = 0;
    }
}

function addCart(){
    if (amountItemPerma === 0){ // se a quantidade permanente de itens for undefined
        amountItemPerma = JSON.parse(localStorage.getItem("amountItem"));
    }
    itemsCart = amountItemPerma; // itens do carrinho recebe a quantidade escolhida pelo usuário

    localStorage.setItem("itemsCart", itemsCart);
}

// mostrar carrinho
function showCart(){
    console.log(itemsCart);
    let cart = document.querySelector(".js-product__cart");
    // se o carrinho estiver vazio, mostrar parágrafo
    if (itemsCart == 0){
        cart.children[1].innerHTML = "<li>Your cart is empty.</li>";
    }
    // se o carrinho tiver de 1 item pra cima mostrar itens
    else if(itemsCart >= 1){
        cart.children[1].innerHTML = "";
        for(let i = 0; i < itemsCart; i++){
            cart.children[1].innerHTML += "<li>Item 1</li>";
        }
    }

}
