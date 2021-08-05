import * as nocturno from "./nocturno.js";
import * as hamburguesa from "./hamburguesa.js";
import * as trendingGif from "./trendingGif.js";
import * as busqueda from "./busqueda.js";

const storage = window.localStorage;
let modoNocturno = false
let favoritos = [];
let creados = []

if (storage.length < 3){
    storage.setItem("favoritos", JSON.stringify(favoritos));
    storage.setItem("creados", JSON.stringify(creados));
    storage.setItem("nocturno", JSON.stringify(modoNocturno));
}