const botonNocturno = document.getElementById("nocturno");
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const logo = document.getElementById("logo");
const botonesNav = document.querySelectorAll("#nav-button");
const crearGif = document.getElementById("crear-gif");
const camImg = document.getElementById("cam-img");
const borde = document.getElementById("borde");
const uno = document.getElementById("1");
const dos = document.getElementById("2");
const tres = document.getElementById("3");
const linea = document.getElementById("linea")
const comenzar = document.getElementById("comenzar");
const grabar = document.getElementById("grabar");
const finalizar = document.getElementById("finalizar");
const subir = document.getElementById("subir-gif");
const repetir = document.getElementById("repetir");
const contador = document.getElementById("contador");
const pelicula = document.getElementById("pelicula");
const footer = document.querySelector("footer");
let nocturno = false;
const storage = window.localStorage;

function cambiarModo(noc){
    if (noc == false){
        body.className = "nocturno";
        nav.className = "nocturno";
        logo.innerHTML = `<img src="./images/Logo-modo-noc.svg" class="logo" alt="Logo">`;
        for (const boton of botonesNav){
            boton.className = "nav-li-noc";
        }
        botonNocturno.innerText = "MODO DIURNO";
        crearGif.className = "crear-gif-noc";
        camImg.innerHTML = `
            <img src="./images/camara-modo-noc.svg">
            <div class="luz"></div>
        `
        borde.className = "borde-noc";
        if (uno.className == "paso-actual"){
            uno.className = "paso-actual-noc";
        }
        else {
            uno.className = "paso-noc"
        }
        if (dos.className == "paso-actual"){
            dos.className = "paso-actual-noc";
        }
        else {
            dos.className = "paso-noc"
        }
        if (tres.className == "paso-actual"){
            tres.className = "paso-actual-noc";
        }
        else {
            tres.className = "paso-noc"
        }
        linea.className = "linea-noc";
        if (comenzar.className != "inactivo"){
            comenzar.className = "control-noc";
        }
        if (grabar.className != "inactivo"){
            grabar.className = "control-noc";
        }
        if (finalizar.className != "inactivo"){
            finalizar.className = "control-noc";
        }
        if (subir.className != "inactivo"){
            subir.className = "control-noc";
        }
        if (contador.className != "inactivo"){
            contador.className = "contador-noc";
        }
        if (repetir.className != "inactivo"){
            repetir.className = "repetir-noc";
        }
        pelicula.attributes.src.value = "./images/pelicula-modo-noc.svg"
        footer.className = "nocturno"; 
        nocturno = true;
        storage.setItem("nocturno", JSON.stringify(nocturno));
    }

    else if (noc == true){
        body.className = "";
        nav.className = "";
        logo.innerHTML = `<img src="./images/logo-desktop.svg" class="logo" alt="Logo">`;
        for (const boton of botonesNav){
            boton.className = "nav-li";
        }
        botonNocturno.innerText = "MODO NOCTURNO";
        crearGif.className = "crear-gif";
        camImg.innerHTML = `
            <img src="./images/camara.svg">
            <div class="luz"></div>
        `
        borde.className = "borde";
        if (uno.className == "paso-actual-noc"){
            uno.className = "paso-actual";
        }
        else {
            uno.className = "paso"
        }
        if (dos.className == "paso-actual-noc"){
            dos.className = "paso-actual";
        }
        else {
            dos.className = "paso"
        }
        if (tres.className == "paso-actual-noc"){
            tres.className = "paso-actual";
        }
        else {
            tres.className = "paso"
        }
        linea.className = "linea";
        if (comenzar.className != "inactivo"){
            comenzar.className = "control";
        }
        if (grabar.className != "inactivo"){
            grabar.className = "control";
        }
        if (finalizar.className != "inactivo"){
            finalizar.className = "control";
        }
        if (subir.className != "inactivo"){
            subir.className = "control";
        }
        if (contador.className != "inactivo"){
            contador.className = "contador";
        }
        if (repetir.className != "inactivo"){
            repetir.className = "repetir";
        }
        pelicula.attributes.src.value = "./images/pelicula.svg"
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
    for (const boton of botonesNav){
        boton.className = "nav-li-noc";
    }
    botonNocturno.innerText = "MODO DIURNO";
    crearGif.className = "crear-gif-noc";
    camImg.innerHTML = `
        <img src="./images/camara-modo-noc.svg">
        <div class="luz"></div>
    `
    borde.className = "borde-noc";
    if (uno.className == "paso-actual"){
        uno.className = "paso-actual-noc";
    }
    else {
        uno.className = "paso-noc"
    }
    if (dos.className == "paso-actual"){
        dos.className = "paso-actual-noc";
    }
    else {
        dos.className = "paso-noc"
    }
    if (tres.className == "paso-actual"){
        tres.className = "paso-actual-noc";
    }
    else {
        tres.className = "paso-noc"
    }
    linea.className = "linea-noc";
    if (comenzar.className != "inactivo"){
        comenzar.className = "control-noc";
    }
    if (grabar.className != "inactivo"){
        grabar.className = "control-noc";
    }
    if (finalizar.className != "inactivo"){
        finalizar.className = "control-noc";
    }
    if (subir.className != "inactivo"){
        subir.className = "control-noc";
    }
    if (contador.className != "inactivo"){
        contador.className = "contador-noc";
    }
    if (repetir.className != "inactivo"){
        repetir.className = "repetir-noc";
    }
    pelicula.attributes.src.value = "./images/pelicula-modo-noc.svg"
    footer.className = "nocturno"; 
}

botonNocturno.addEventListener("click", () => {
    cambiarModo(nocturno);
})

