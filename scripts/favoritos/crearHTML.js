function favoritear(gif, gifArray) {
    let storage = window.localStorage;
    let idArray = JSON.parse(storage.getItem("favoritos"))
    if (idArray.length == 0){
        idArray.push(gifArray[gif.attributes.name.value].id)
        storage.setItem("favoritos", JSON.stringify(idArray))
        gif.innerHTML = '<i class="fas fa-heart"></i>'
    }
    else {
        const verificar = idArray.indexOf(gifArray[gif.attributes.name.value].id)
        if (verificar === -1){
            idArray.push(gifArray[gif.attributes.name.value].id)
            storage.setItem("favoritos", JSON.stringify(idArray))
            gif.innerHTML = '<i class="fas fa-heart"></i>'
        }
        else if (verificar > -1){
            idArray.splice(verificar, 1);
            storage.setItem("favoritos", JSON.stringify(idArray))
            gif.innerHTML = '<i class="far fa-heart"></i>'
        }
    }
}

async function getImage(url) {

    const imageFetch = await fetch(url);
    const file = await imageFetch.blob();
    const urlBlob = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.download = "myImage";
    a.href = urlBlob;
    a.textContent = "Download"

    a.click();
}

function maximizar(gif, gifArray){
    const max = document.getElementById("max");
    let indice = parseInt(gif);
    const storage = window.localStorage;
    let nocturno = false;

    if (storage.getItem("nocturno")){
        nocturno = JSON.parse(storage.getItem("nocturno"));
    }

    if (nocturno == false){
        max.className = "expandir"
    }
    else {
        max.className = "expandir-noc"
    }
    max.innerHTML = `
    <button class="max-cerrar" id="max-cerrar"><i class="fas fa-times"></i></button>
    <div class="max-galeria">
        <div id="gif-max">
            <img id="gif-original" src="${gifArray[indice].images.original.url}">
            <div class="max-info">
                <h3 id="gif-max-user">${gifArray[indice].username}</h3>
                <h4 id="gif-max-title">${gifArray[indice].title}</h4>
            </div>
            <div class="max-buttons">
                <button name="${indice}" id="max-fav"><i class="far fa-heart"></i></button>
                <button name="${indice}" id="max-descargar"><i class="fas fa-download"></i></button>
            </div>
        </div>
    </div>
    `


    const maxCerrar = document.getElementById("max-cerrar");

    maxCerrar.addEventListener("click", (e) => {
        max.className = "inactivo"
    })

    const maxFav = document.getElementById("max-fav");

    maxFav.addEventListener("click", (e) => {
        favoritear(maxFav, gifArray);
    })

    const gifDescarga = document.querySelectorAll("#max-descargar");

    for (let gif of gifDescarga){
        gif.addEventListener("click", (e) => {
            getImage(gifArray[indice].images.original.url);
        })
    }
}

function maximizarFav(gif, gifArray){
    const max = document.getElementById("max");
    let indice = parseInt(gif);
    const storage = window.localStorage;
    let nocturno = false;

    if (storage.getItem("nocturno")){
        nocturno = JSON.parse(storage.getItem("nocturno"));
    }

    if (nocturno == false){
        max.className = "expandir"
    }
    else {
        max.className = "expandir-noc"
    }
    max.innerHTML = `
    <button class="max-cerrar" id="max-cerrar"><i class="fas fa-times"></i></button>
    <div class="max-galeria">
        <div id="gif-max">
            <img src="${gifArray[indice].images.original.url}">
            <div class="max-info">
                <h3>${gifArray[indice].username}</h3>
                <h4>${gifArray[indice].title}</h4>
            </div>
            <div class="max-buttons">
                <button name="${indice}" id="max-fav"><i class="fas fa-heart"></i></button>
                <button name="${indice}" id="max-descargar"><i class="fas fa-download"></i></button>
            </div>
        </div>
    </div>
    `


    const maxCerrar = document.getElementById("max-cerrar");

    maxCerrar.addEventListener("click", (e) => {
        max.className = "inactivo"
    })

    const maxFav = document.getElementById("max-fav");

    maxFav.addEventListener("click", (e) => {
        favoritear(maxFav, gifArray);
    })

    const gifDescarga = document.querySelectorAll("#max-descargar");

    for (let gif of gifDescarga){
        gif.addEventListener("click", (e) => {
            getImage(gifArray[indice].images.original.url);
        })
    }
}

function crearFavoritosGif(gifArray, suma){
    const favoritosGif = document.getElementById("favoritos-guardados");
    let limite = 0;
    favoritosGif.innerHTML = "";

    if (suma == 0){
        if (gifArray.length < 10){
            limite = gifArray.length;
        }
        else {
            limite = 12
        }
    }
    else {
        limite = 12 + suma;
    }

    for (let counter = 0; counter < limite; counter++){
        favoritosGif.innerHTML += `
        <div class="tarjeta gif-favoritos" id="${counter}">
            <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
            <div class="fondo-tarjeta">
                <div class="contenedor-botones">
                    <button class="boton-tarjeta" name="${counter}" id="favoritos-fav"><i class="fas fa-heart"></i></button>
                    <button class="boton-tarjeta" name="${counter}" id="descargar-fav"><i class="fas fa-download"></i></button>
                    <button class="boton-tarjeta" name="${counter}" id="expandir-fav"><i class="fas fa-expand-alt"></i></button>
                </div>
            
                <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
            </div>
        </div>
        ` 
    }

    const gifs = document.querySelectorAll(".gif-favoritos");

    for (let gif of gifs){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.id.value, gifArray);
        })
    }

    const gifExpandir = document.querySelectorAll("#expandir-fav");

    for (let gif of gifExpandir){
        gif.addEventListener("click", (e) => {
            maximizarFav(gif.attributes.name.value, gifArray);
        })
    }

    const gifFavoritos = document.querySelectorAll("#favoritos-fav");

    for (let gif of gifFavoritos){
        gif.addEventListener("click", (e) => {
            favoritear(gif, gifArray);
        })
    }

    const gifDescarga = document.querySelectorAll("#descargar-fav");

    for (let gif of gifDescarga){
        gif.addEventListener("click", (e) => {
            getImage(gifArray[gif.attributes.name.value].images.original.url);
        })
    }
}


function crearTrendingGif(gifArray){
    if (gifArray != []) {
        const trendingGif = document.getElementById("galeria-gif");
        trendingGif.innerHTML = "";
        for (let counter = 0; counter < 10; counter++){
            trendingGif.innerHTML += `
            <div class="tarjeta trending" id="${counter}">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <button class="boton-tarjeta" name="${counter}" id="favoritos-trending"><i class="far fa-heart"></i></button>
                        <button class="boton-tarjeta" name="${counter}" id="descargar-trending"><i class="fas fa-download"></i></button>
                        <button class="boton-tarjeta" name="${counter}" id="expandir-trending"><i class="fas fa-expand-alt"></i></button>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
    }

    const gifs = document.querySelectorAll(".trending");

    for (let gif of gifs){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.id.value, gifArray);
        })
    }

    const gifExpandir = document.querySelectorAll("#expandir-trending");

    for (let gif of gifExpandir){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.name.value, gifArray);
        })
    }

    const gifFavoritos = document.querySelectorAll("#favoritos-trending");

    for (let gif of gifFavoritos){
        gif.addEventListener("click", (e) => {
            favoritear(gif, gifArray);
        })
    }

    const gifDescarga = document.querySelectorAll("#descargar-trending");

    for (let gif of gifDescarga){
        gif.addEventListener("click", (e) => {
            getImage(gifArray[gif.attributes.name.value].images.original.url);
        })
    }
}



export default {crearTrendingGif, maximizar, favoritear, crearFavoritosGif};