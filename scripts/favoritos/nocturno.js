const botonNocturno = document.getElementById("nocturno");
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logo = document.getElementById("logo");
const botonesNav = document.querySelectorAll("#nav-button");
const botonHamburguesa = document.getElementById("boton-hamburguesa");
const hamburguesa = document.getElementById("menu-nav");
const crearGif = document.getElementById("crear-gif");
const titulo = document.getElementById("titulo-favoritos");
const trendingGif = document.getElementById("trending-gif-container");
const botonIzq = document.getElementById("boton-galeria-atras");
const botonDer = document.getElementById("boton-galeria-adelante");
const footer = document.querySelector("footer");
let nocturno = false;
const storage = window.localStorage;

function cambiarModo(noc){
    if (noc == false){
        body.className = "nocturno";
        nav.className = "nocturno";
        logo.innerHTML = `<img src="./images/Logo-modo-noc.svg" class="logo" alt="Logo">`;
        botonHamburguesa.className = "boton-hamburguesa-noc";
        hamburguesa.className = "menu-nav-noc";
        for (const boton of botonesNav){
            boton.className = "nav-li-noc";
        }
        botonNocturno.innerText = "MODO DIURNO";
        crearGif.className = "crear-gif-noc";
        titulo.className = "titulo-noc";
        trendingGif.className = "trending-gif-noc";
        botonIzq.className = "move-noc";
        botonDer.className = "move-noc";
        footer.className = "nocturno"; 
        nocturno = true;
        storage.setItem("nocturno", JSON.stringify(nocturno));
    }

    else if (noc == true){
        body.className = "";
        nav.className = "";
        logo.innerHTML = `<img src="./images/logo-desktop.svg" class="logo" alt="Logo">`;
        botonHamburguesa.className = "boton-hamburguesa";
        hamburguesa.className = "menu-nav";
        for (const boton of botonesNav){
            boton.className = "nav-li";
        }
        botonNocturno.innerText = "MODO NOCTURNO";
        crearGif.className = "crear-gif";
        titulo.className = "titulo";
        trendingGif.className = "trending-gif";
        botonIzq.className = "move";
        botonDer.className = "move";
        footer.className = ""; 
        nocturno = false;
        storage.setItem("nocturno", JSON.stringify(nocturno));
    }
}

if (storage.getItem("nocturno")){
    nocturno = JSON.parse(storage.getItem("nocturno"));
}

if (nocturno == true){
    body.className = "nocturno";
    nav.className = "nocturno";
    logo.innerHTML = `<img src="./images/Logo-modo-noc.svg" class="logo" alt="Logo">`;
    botonHamburguesa.className = "boton-hamburguesa-noc";
    hamburguesa.className = "menu-nav-noc";
    for (const boton of botonesNav){
        boton.className = "nav-li-noc";
    }
    botonNocturno.innerText = "MODO DIURNO";
    crearGif.className = "crear-gif-noc";
    titulo.className = "titulo-noc";
    trendingGif.className = "trending-gif-noc";
    botonIzq.className = "move-noc";
    botonDer.className = "move-noc";
    footer.className = "nocturno"; 
}

botonNocturno.addEventListener("click", () => {
    cambiarModo(nocturno);
})

