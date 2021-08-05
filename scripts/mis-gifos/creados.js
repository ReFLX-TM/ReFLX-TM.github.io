import crear from "./crearHTML.js";

const creaAlgo = document.getElementById("crea-algo");
const gifCreados = document.getElementById("mis-gif-guardados");
let storage = window.localStorage;
let idString = "";
let misGif = [];
let suma = 0;

let idArray = JSON.parse(storage.getItem("creados"))

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
    misGif = gifJson.data;

    creaAlgo.className = "inactivo";
    gifCreados.className = "grid-creados";
    crear.crearMisGif(misGif, suma);
    
    const verMas = document.getElementById("ver-mas");
    
    if (misGif.length <= 12){
        verMas.className = "inactivo"
    }
    else {
        verMas.className = "";
    }
    
    verMas.addEventListener("click", (e) => {
        if (misGif.length >= 24 + suma){
            suma += 12;
            crear.crearFavoritosGif(misGif, suma);
        }
        else {
            verMas.className = "inactivo";
            suma += (misGif.length - (suma + 12));
            crear.crearFavoritosGif(misGif, suma);
        }
    })
}