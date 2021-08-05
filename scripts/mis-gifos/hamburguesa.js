const botonHamburguesa = document.getElementById("boton-hamburguesa");
const icono = document.getElementById("icon");
const hamburguesa = document.getElementById("menu-hamburguesa");
const menuHamburguesa = document.getElementById("menu-nav");
let estado = "cerrado";

botonHamburguesa.addEventListener("click", (e) => {
    if (estado == "cerrado"){
        hamburguesa.style.display = "inline-block";
        estado = "abierto";
        icono.className = "fas fa-times";
    }
    else if (estado == "abierto"){
        hamburguesa.style.display = "";
        icono.className = "fas fa-bars";
        estado = "cerrado";
    }
})