import crear from "./crearHTML.js";

const guardaAlgo = document.getElementById("guarda-algo");
const favoritosGuardados = document.getElementById("favoritos-guardados");
let storage = window.localStorage;
let idString = "";
let favGif = [];
let suma = 0;

let idArray = JSON.parse(storage.getItem("favoritos"))

if (idArray.length != 0){
    for (let counter = 0; counter < idArray.length; counter++){
        if (counter == 0){
            idString = `${idArray[counter]}`;
        }
        else {
            idString += "," + `${idArray[counter]}`;
        }
    }
    
    const gifResponse = await fetch(`https://api.giphy.com/v1/gifs?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&ids=${idString}`);
    const gifJson = await gifResponse.json();
    favGif = gifJson.data;

    guardaAlgo.className = "inactivo";
    favoritosGuardados.className = "grid-favoritos";
    crear.crearFavoritosGif(favGif, suma);


    const verMas = document.getElementById("ver-mas");
    
    if (favGif.length <= 12){
        verMas.className = "inactivo"
    }
    else {
        verMas.className = "";
    }
    
    verMas.addEventListener("click", (e) => {
        if (favGif.length >= 24 + suma){
            suma += 12;
            crear.crearFavoritosGif(favGif, suma);
        }
        else {
            verMas.className = "inactivo";
            suma += (favGif.length - (suma + 12));
            crear.crearFavoritosGif(favGif, suma);
        }
    })
}