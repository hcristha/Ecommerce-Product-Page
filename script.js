// mostrar menu
let menu = document.querySelector(".js-menu");
let box = document.querySelector(".js-menu__box");
let options = document.querySelector(".js-header-box__options-menu");
 
if (screen.width < 745){// 744px abaixo, mobile
    console.log("w");
    options.onclick = function(){ // mobile
        console.log("h");
        box.style.display = "block";
        menu.style.display = "block";

        // quando clicar no "x" dentro do menu, vai fechar menu e box
        let close = document.querySelector(".menu__close");
        close.addEventListener("click", function(){
            menu.style.display = "none";
            box.style.display = "none";
        });

        // quando clicar fora do menu, ou seja, no box transparente, vai fechar tanto menu quanto box
        box.addEventListener("click", function(){
            menu.style.display = "none";
            box.style.display = "none";
        });
    }
}
else{ // 745px acima, pc
    console.log("y");
    box.style.display = "none";
    console.log("x");
} 

// quantidade de itens
var amountItem = document.querySelector(".product__amount-item");
var numberCart = document.querySelector(".header-box__options-cart--number");
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
        // iconCart.style.fill = "#000000"; // muda a cor do ícone acima do carrinho para preto
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
    // numberCart.style.display = "block";

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

//mostrar carrinho
function showCart(){
    itemsCart = JSON.parse(localStorage.getItem("itemsCart")); // atualizar quantidade de itens

    clickCart++; // adiciona mais um no contador de cliques do Cart
    // let empty = document.querySelector(".js-empty");

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

// imagens para função nextImg()
var img = document.querySelector(".js-product__img-img"); // foto do produto
var icons = document.querySelector(".js-product__img-icons"); // ícones de voltar e próxima

var click = 1; // contador começa em 1
function nextImg(){ // próxima imagem
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
//// imgs
let img1 = document.querySelector(".img1");
let img2 = document.querySelector(".img2");
let img3 = document.querySelector(".img3");
let img4 = document.querySelector(".img4");
//// divs
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
function showBox1(e){// elemento(img) como argumento
    //imgs
    //// imagens não clicadas ficam visiveis
    img2.style.opacity = "1";
    img3.style.opacity = "1";
    img4.style.opacity = "1";
    // imagem clicada fica opaca
    e.style.opacity = "0.5";

    //divs
    //// divs anteriores somem
    two.style.display = "none";
    three.style.display = "none";
    four.style.display = "none";
    // div da imagem clicada aparece
    one.style.display = "block";
}

function showBox2(e){// elemento(img) como argumento
    //imgs
    //// imagens não clicadas ficam visiveis
    img1.style.opacity = "1";
    img3.style.opacity = "1";
    img4.style.opacity = "1";
    // imagem clicada fica opaca
    e.style.opacity = "0.5";

    //divs
    //// divs anteriores somem
    one.style.display = "none";
    three.style.display = "none";
    four.style.display = "none";
    //// div da imagem clicada aparece
    two.style.display = "block";

    // SIMULANDO HOVER
    //// ao mouse passar por cima da img, img fica opaca
    function hover(){
        this.style.opacity = "0.4";
    }
    //// ao mouse sair da img, a img se torna visível
    function mouseOut(){
        this.style.opacity = "1";
    }

    img1.addEventListener("mouseover", hover);
    img1.addEventListener("mouseout", mouseOut);
    img3.addEventListener("mouseover", hover);
    img3.addEventListener("mouseout", mouseOut);
    img4.addEventListener("mouseover", hover);
    img4.addEventListener("mouseout", mouseOut);
}

function showBox3(e){// elemento(img) como argumento
    //imgs
    //// imagens não clicadas ficam visiveis
    img1.style.opacity = "1";
    img2.style.opacity = "1";
    img4.style.opacity = "1";
    // imagem clicada fica opaca
    e.style.opacity = "0.5";

    //divs
    //// divs anteriores somem
    one.style.display = "none";
    two.style.display = "none";
    four.style.display = "none";
    // div da imagem clicada aparece
    three.style.display = "block";

    // SIMULANDO HOVER
    //// ao mouse passar por cima da img, img fica opaca
    function hover(){
        this.style.opacity = "0.4";
    }
    //// ao mouse sair da img, a img se torna visível
    function mouseOut(){
        this.style.opacity = "1";
    }

    img1.addEventListener("mouseover", hover);
    img1.addEventListener("mouseout", mouseOut);
    img2.addEventListener("mouseover", hover);
    img2.addEventListener("mouseout", mouseOut);
    img4.addEventListener("mouseover", hover);
    img4.addEventListener("mouseout", mouseOut);
    /*AQUI! Por a imagem clicada não fica opaca?*/
}

function showBox4(e){// elemento(img) como argumento
    //imgs
    //// imagens não clicadas ficam visiveis
    img1.style.opacity = "1";
    img2.style.opacity = "1";
    img3.style.opacity = "1";
    // imagem clicada fica opaca
    e.style.opacity = "0.5";

    //divs
    //// divs anteriores somem
    one.style.display = "none";
    two.style.display = "none";
    three.style.display = "none";
    // div da imagem clicada aparece
    four.style.display = "block";
}