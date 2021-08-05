import crear from "./crearHTML.js";
const galeria = document.getElementById("galeria-gif");
const trendingResponse = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&limit=10");
const trendingJson = await trendingResponse.json();
const gifArray = trendingJson.data;

crear.crearTrendingGif(gifArray);

const botonIzquierda = document.getElementById("boton-galeria-atras");
const botonDerecha = document.getElementById("boton-galeria-adelante");

function sideScroll(element,direction,speed,distance,step){
    let scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

botonIzquierda.addEventListener("click", () => {
    sideScroll(galeria,'left',25,100,10);
})

botonDerecha.addEventListener("click", () => {
    sideScroll(galeria,'right',25,100,10);
})