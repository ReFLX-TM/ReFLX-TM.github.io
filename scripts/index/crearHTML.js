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

function crearTrendings(stringArray){
    const trendingTags = document.getElementById("trending-tags");
    trendingTags.innerHTML = `<a class="tag" href="#trending-tags">${stringArray[0]}</a>, <a class="tag" href="#trending-tags">${stringArray[1]}</a>, <a class="tag" href="#trending-tags">${stringArray[2]}</a>, <a class="tag" href="#trending-tags">${stringArray[3]}</a>, <a class="tag" href="#trending-tags">${stringArray[4]}</a>
    `;
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
    const indice = parseInt(gif);
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

function autocompletar(autoArray){
    const auto = document.getElementById("autocompletar")
    auto.innerHTML = "";

    if (autoArray != []){
        auto.innerHTML = "<hr/>"
        for (const sugerencia of autoArray){
            auto.innerHTML +=
                `
                <div class="sugerencia">
                    <i class="fas fa-search"></i>
                    <li><a href="#buscar">${sugerencia.name}<a></li>
                </div>
                `;
        }
    }
}

function busquedaGifs(busqueda, gifArray, clave){
    const seccion = document.getElementById("resultados")
    const titulo = document.getElementById("titulo-busqueda");
    const noResult = document.getElementById("lo-sentimos")
    const resultados = document.getElementById("resultados-busqueda");
    const mas = document.getElementById("ver-mas");
    const storage = window.localStorage;
    let nocturno = false;

    if (storage.getItem("nocturno")){
        nocturno = JSON.parse(storage.getItem("nocturno"));
    }
    
    if (gifArray.length != 0){
        titulo.innerHTML = `${busqueda}`;
        resultados.innerHTML = "";
        for (let counter = 0; counter < clave; counter++){
            noResult.className = "inactivo";
            resultados.className = "grid-resultados";
            if (nocturno == false){
                seccion.className = "resultados-busqueda";
                mas.className = "ver-mas";
            }
            else if (nocturno == true){
                seccion.className = "resultados-busqueda-noc";
                mas.className = "ver-mas-noc";
            }
            resultados.innerHTML += `
            <div class="tarjeta gif-busqueda" id="${counter}">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <button class="boton-tarjeta" name="${counter}" id="favoritos-busqueda"><i class="far fa-heart"></i></button>
                        <button class="boton-tarjeta" name="${counter}" id="descargar-busqueda"><i class="fas fa-download"></i></button>
                        <button class="boton-tarjeta" name="${counter}" id="expandir-busqueda"><i class="fas fa-expand-alt"></i></button>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
    }
    else {
        titulo.innerHTML = "Lorem Ipsum";
        seccion.className = "sin-resultados";
        noResult.className = "contenedor-noresult";
        resultados.className = "inactivo";
        mas.className = "inactivo";
    }

    const gifs = document.querySelectorAll(".gif-busqueda");

    for (let gif of gifs){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.id.value, gifArray);
        })
    }
    
    const gifGaleria = document.querySelectorAll("#expandir-busqueda");

    for (let gif of gifGaleria){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.name.value, gifArray);
        })
    }

    const gifFavoritos = document.querySelectorAll("#favoritos-busqueda");

    for (let gif of gifFavoritos){
        gif.addEventListener("click", (e) => {
            favoritear(gif, gifArray);
        })
    }

    const gifDescarga = document.querySelectorAll("#descargar-busqueda");

    for (let gif of gifDescarga){
        gif.addEventListener("click", (e) => {
            getImage(gifArray[gif.attributes.name.value].images.original.url);
        })
    }
}



export default {crearTrendings, crearTrendingGif, autocompletar, busquedaGifs, maximizar, favoritear};