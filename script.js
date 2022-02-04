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
var numberCart = document.querySelector(".header__options-cart--number");
var c = 0; // contador de cliques começa em 0
var amountItemPerma; // variável para salvar na memória do navegador a quantidade de itens escolhidas pelo usuário

// itens no carrinho
var itemsCart = 0; // itens dentro do carrinho começa em zero

amountItemPerma = JSON.parse(localStorage.getItem("amountItem")); // acessando quantidade de itens salva e tornando-a definitiva
if (amountItemPerma === null){ // primeira vez que acessa o site
    amountItemPerma = 0;
}
amountItem.innerText = amountItemPerma; // mostrando na tela quantidade de itens definitiva

if (amountItemPerma !== 0 && amountItemPerma !== null){ // atualizar contador
    c = amountItemPerma;
}

// pegar itens salvos do carrinho
itemsCart = JSON.parse(localStorage.getItem("itemsCart"));
if (itemsCart ==! null || itemsCart !== undefined){
    numberCart.innerText = itemsCart; // mostrar último número de itens dentro do cart
}

if (itemsCart === null){
    itemsCart = 0;
    numberCart.innerText = itemsCart; // número de itens dentro do cart começa em 0
}
////


// aumentar quantidade de itens
function increaseAmount(){ // serve para exibir quantidade de itens temporária
    if (c <= 19){ // contador soma até 20
        c += 1; // contador incrementa a cada clique
        amountItem.innerText = c; // atualizando quantidade de itens

        localStorage.setItem("amountItem", c); // salvando a nova quantidade
    }
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


// função para adicionar item no carrinho
function addCart(){
    itemsCart = amountItem.innerText; // itens do carrinho recebe a quantidade escolhida pelo usuário, se o amountItem atualizar, atualiza também itemsCart na memória
    numberCart.innerText = itemsCart; // atualiza número de itens dentro do cart
    localStorage.setItem("itemsCart", itemsCart); // salva a nova quantidade de itens dentro do cart
    cartFilled();
}


var cart = document.querySelector(".js-product__cart");
var clickCart = 0; // contador de cliques do Cart

// mudar cursor para elementos ativos
function cartEmpty(){ // função para carrinho vazio
    cart.children[1].innerHTML = "<ul class='product__cart-info--items' style='align-items: center; justify-content: center; padding: 0; height: 100%;'></ul>"; //limpa conteúdo, cria ul
    cart.children[1].children[0].innerHTML = "<li class='empty'>Your cart is empty.</li>"; // criar elemento dentro da ul para informar que está vazio

    cart.children[2].style.display = "none"; // botão desaparece
}

function cartFilled(){ // função para carrinho cheio
    // criar elemento imagem do produto
    cart.children[1].innerHTML = "<img class='img' alt='' src='images/image-product-1-thumbnail.jpg'>";

    cart.children[1].innerHTML += "<ul class='product__cart-info--items'></ul>"; // limpar conteúdo, criar ul
    // criar elementos dentro da ul que representam o produto
    cart.children[1].children[1].innerHTML += "<li class='filled'>Fall Limited Edition Sneakers</li>";
    cart.children[1].children[1].innerHTML += `<li class='filled'>$125.00 x ${itemsCart} <strong style='color: black'>$${125 * itemsCart}</strong></li>`;

    // criar elemento imagem para remover produto
    cart.children[1].innerHTML += "<img class='js-delete' alt='' src='images/icon-delete.svg'>";

    cart.children[2].style.display = "block"; // botão aparecer

    // deletar o produto
    let delet = document.querySelector(".js-delete");
    delet.onclick = function(){
        cartEmpty();

        localStorage.setItem("itemsCart", 0); // zerar itens dentro do carrinho
        itemsCart = JSON.parse(localStorage.getItem("itemsCart")); // atualizar quantidade de itens
        numberCart.innerText = itemsCart; // atualiza número de itens dentro do cart
    }
}

//mostrar carrinho
function showCart(){
    itemsCart = JSON.parse(localStorage.getItem("itemsCart")); // atualizar quantidade de itens

    clickCart++; // adiciona mais um no contador de cliques do Cart
    // let empty = document.querySelector(".js-empty");

    cart.style.display = "block"; // irá abrir o cart

    // se o carrinho estiver vazio, mostrar mensagem
    if (itemsCart === 0){
        cartEmpty();
    }
    // se o carrinho tiver de 1 item pra cima mostrar itens
    else if(itemsCart >= 1){
        cartFilled();
    }

    function hideCart(){ // esconder Cart
        cart.style.display = "none";
    }

    if (clickCart % 2 == 0){ // se o contador for divisível por 2 executar função
        hideCart(); // esconder Cart
    }
}
