// MOBILE: mostrar menu
var menu = document.querySelector(".js-menu");
function showMenu(){
    // mostrar menu
    menu.style.display = "block";

    // ao clicar ícone x, desaparecer menu
    menu.children[0].children[0].addEventListener("click", function(){
        menu.style.display = "none";
    });
}

// quantidade de itens
var amountItem = document.querySelector(".js-product__info--amount-n");
var numberCart = document.querySelector(".js-header-box__options-cart--number");
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
if (itemsCart !== null && itemsCart !== undefined && itemsCart !== 0){
    numberCart.innerText = itemsCart; // último número escolhido pelo usuário vai se tornar ícone acima do cart
    numberCart.style.display = "block"; // mostrar ícone acima do cart
}

if (itemsCart === null){
    itemsCart = 0;
    numberCart.innerText = itemsCart; // caso não tenha escolhido nenhum valor, o ícone acima da cart recebe zero 
}
////


// aumentar quantidade de itens
function increaseAmount(){ // serve para exibir quantidade de itens temporária
    if (c <= 8){ // contador soma até 9
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
    itemsCart = JSON.parse(amountItem.innerText); // itens do carrinho recebe a quantidade escolhida pelo usuário, se o amountItem atualizar, atualiza também itemsCart na memória
    numberCart.innerText = itemsCart; // atualiza ícone do número de itens dentro do cart
    if (itemsCart == 0){ // se número de ítens dentro do carrinho for 0
        numberCart.style.display = "none"; // esconde ícone acima do carrinho
        cartEmpty(); // função de carrrinho vazio
    }
    localStorage.setItem("itemsCart", itemsCart); // salva a nova quantidade de itens dentro do cart
    if (itemsCart !== 0){ // somente executar função de carrinho cheio se 'itemsCart' for diferente de 0
        cartFilled(); // função carrinho cheio
    }
}


// mudar a cor do carrinho
var iconCart = document.querySelector(".js-header-box__options-cart-path"); // ícone do carrinho
if (itemsCart !== 0){
    iconCart.style.fill = "#69707D"; // se carrinho estiver cheio muda para cor cinza
}
else{
    iconCart.style.fill = "#000000"; // se carrinho estiver vazio muda para cor preto
}

var cart = document.querySelector(".js-product__cart");

function cartEmpty(){ // função para carrinho vazio
    iconCart.style.fill = "#000000"; // se carrinho estiver vazio muda para cor preto
    cart.children[2].innerHTML = "<ul class='product__cart-info--items' style='align-items: center; justify-content: center; padding: 0; height: 100%;'></ul>"; //limpa conteúdo, cria ul
    cart.children[2].children[0].innerHTML = "<li class='empty'>Your cart is empty.</li>"; // criar elemento dentro da ul para informar que está vazio

    cart.children[3].style.display = "none"; // botão desaparece
}

function cartFilled(){ // função para carrinho cheio
    iconCart.style.fill = "#69707D"; // se carrinho estiver cheio muda para cor cinza

    if (itemsCart !== 0){
        numberCart.style.display = "block"; // mostrar ícone acima do cart
    }

    // criar elemento imagem do produto
    cart.children[2].innerHTML = "<img class='img' alt='' src='images/image-product-1-thumbnail.jpg'>";

    cart.children[2].innerHTML += "<ul class='product__cart-info--items'></ul>"; // limpar conteúdo, criar ul
    // criar elementos dentro da ul que representam o produto
    cart.children[2].children[1].innerHTML += "<li class='filled'>Fall Limited Edition Sneakers</li>";
    cart.children[2].children[1].innerHTML += `<li class='filled'>$125.00 x ${itemsCart} <strong style='color: black'>$${125.00 * itemsCart}</strong></li>`;

    // criar elemento imagem para remover produto
    cart.children[2].innerHTML += "<img class='delet js-delete' alt='' src='images/icon-delete.svg'>";

    cart.children[3].style.display = "block"; // botão aparecer

    // deletar o produto
    let delet = document.querySelector(".js-delete");
    delet.onclick = function(){
        cartEmpty();

        localStorage.setItem("itemsCart", 0); // zerar itens dentro do carrinho
        itemsCart = JSON.parse(localStorage.getItem("itemsCart")); // atualizar quantidade de itens
        numberCart.innerText = itemsCart; // atualiza número de itens dentro do cart
        numberCart.style.display = "none"; // mostrar último número de itens como ícone acima do cart
    }
}

var clickCart = 0; // contador de cliques do Cart

// mostrar carrinho
function showCart(){
    itemsCart = JSON.parse(localStorage.getItem("itemsCart")); // atualizar quantidade de itens

    clickCart++; // adiciona mais um no contador de cliques do Cart

    cart.style.display = "block"; // irá abrir o cart

    // se o carrinho estiver vazio, mostrar mensagem
    if (itemsCart === 0 || itemsCart === null || itemsCart === undefined){
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

// MOBILE: próxima imagem
var img = document.querySelector(".js-product__img-img"); // foto do produto

var click = 1; // contador começa em 1
function nextImg(){ // próxima imagem
    let icons = document.querySelector(".js-product__img-icons"); // ícones de voltar e próxima

    if (click >= 1 && click < 4){ // contador vai de 1 até 4
        click++; // incrementa
        img.src = `images/image-product-${click}.jpg`; // muda a imagem
    }

    icons.children[0].onclick = function(){ // imagem anterior
        if (click > 1){ // se for maior que 1
            click--; // decrementa
            img.src = `images/image-product-${click}.jpg`; // muda a imagem
        }
    }
}

// DESKTOP IMG
//// LIGHTBOX
var ltbx = document.querySelector(".js-lightbox");
var ltbxImgKit = document.querySelector(".js-lightbox__img--kit-main");
var ltbxClose = document.querySelector(".js-lightbox__img--svg");

// lightbox aparece
img.onclick = function(){
    if (screen.width >= 746){ // aparecer lightbox apenas em Desktop
        ltbx.style.display = "flex";
    }
}
// ao clicar no ícone x, lightbox desaparece
ltbxClose.onclick = function(){
    ltbx.style.display = "none";
}

// ao clicar na img, muda a a imagem principal do Lightbox
function changeLtbx1(){
    ltbxImgKit.src = "images/image-product-1.jpg"; // muda img
}
function changeLtbx2(){
    ltbxImgKit.src = "images/image-product-2.jpg"; // muda img
}
function changeLtbx3(){
    ltbxImgKit.src = "images/image-product-3.jpg"; // muda img
}
function changeLtbx4(){
    ltbxImgKit.src = "images/image-product-4.jpg"; // muda img
}

// anterior/próxima imagem lightbox
var ltbxClick = 1; // contador de cliques do ícone

function ltbxNext(){
    if (ltbxClick < 4){
        ltbxClick++;
        ltbxImgKit.src = `images/image-product-${ltbxClick}.jpg`; // muda imagem
    }

    let ltbxIcons = document.querySelector(".js-lightbox__img--kit-icons");
    let ltbxPrevious = ltbxIcons.children[0]; // ícone previous

    // imagem anterior
    ltbxPrevious.onclick = function(){
        if (ltbxClick > 1){
            ltbxClick--;
            ltbxImgKit.src = `images/image-product-${ltbxClick}.jpg`; // muda imagem
        }
    }
}

//// PÁGINA DESKTOP
////// mudar imagem principal da página
function changeImg1(){
    img.src = "images/image-product-1.jpg"; // muda img
}

function changeImg2(){
    img.src = "images/image-product-2.jpg"; // muda img
}

function changeImg3(){
    img.src = "images/image-product-3.jpg"; // muda img
}

function changeImg4(){
    img.src = "images/image-product-4.jpg"; // muda img
}
