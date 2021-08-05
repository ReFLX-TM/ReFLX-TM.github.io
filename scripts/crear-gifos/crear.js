function conteo (){
    let s = 0;
    let m = 0;
    let h  = 0;
    let reloj;
    intervalo = setInterval(() => {
        s++
        let horas = "";
        let minutos = "";
        let segundos = "";
        
        if(s == 60) {
            s = 0
            m++
            grabando = false
        }

        if (m == 60) {
            m = 0
            h++
        }

        if (s < 10){
            segundos = `0${s}`;
        }
        else {
            segundos = `${s}`
        }

        if (m < 10){
            minutos = `0${m}`;
        }
        else {
            minutos = `${m}`
        }

        if (h < 10){
            horas = `0${h}`;
        }
        else {
            horas = `${h}`
        }

        reloj = `${horas}:${minutos}:${segundos}`;
        contador.innerHTML = `${reloj}`
    }, 1000)
}

function detener(){
    clearInterval(intervalo);
    contador.innerHTML = "00:00:00"
}

function getMediaRecord() { 
    navigator.mediaDevices.getUserMedia({audio: false, video: {height: 320, width: 480}})
    .then((mediaStream) => {
        stream = mediaStream
        video.srcObject = mediaStream;
        video.play();
        video.className = "";
        titulo.className = "inactivo";
        info.className = "inactivo";
        nocturno = JSON.parse(storage.getItem("nocturno"));
        if (nocturno == false){
            grabar.className = "control";
        }
        else {
            grabar.className = "control-noc";
        }
        recorder = RecordRTC(mediaStream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 480,
            hidden: 240,
            onGifRecordingStarted: function() {
             console.log('iniciado')
           },
        });
    })
}

async function descarga(url){
    const imageFetch = await fetch(url);
    const file = await imageFetch.blob();
    const urlBlob = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.download = "myImage";
    a.href = urlBlob;
    a.textContent = "Download"

    a.click();
}


const comenzar = document.getElementById("comenzar");
const grabar = document.getElementById("grabar");
const contador = document.getElementById("contador");
const finalizar = document.getElementById("finalizar");
const repetir = document.getElementById("repetir");
const subir = document.getElementById("subir-gif");
const titulo = document.getElementById("titulo");
const info = document.getElementById("info");
const video = document.getElementById("reproductor");
const fondo = document.getElementById("fondo");
const infoGif = document.getElementById("info-gif");
const botones = document.getElementById("botones-fondo");
const descargar = document.getElementById("descargar");
const uno = document.getElementById("1");
const dos = document.getElementById("2");
const tres = document.getElementById("3");
let recorder;
let stream;
let intervalo;
let gifId;
let storage = window.localStorage;
let idArray = [];
let nocturno = false;

if (storage.getItem("nocturno")){
    nocturno = JSON.parse(storage.getItem("nocturno"));
}

if (storage.getItem("creados")){
    idArray = JSON.parse(storage.getItem("creados"));
}

comenzar.addEventListener("click", (e) => {
    comenzar.className = "inactivo";
    titulo.innerHTML = `¿Nos das acceso<br/>a tu cámara?`;
    info.innerHTML = `El acceso a tu camara será válido sólo<br/>por el tiempo en el que estés creando el GIFO.`;
    nocturno = JSON.parse(storage.getItem("nocturno"));
    if (nocturno == false){
        uno.className = "paso-actual";
    }
    else {
        uno.className = "paso-actual-noc";
    }
    getMediaRecord();
})

grabar.addEventListener("click", (e) => {
    recorder.startRecording();
    grabar.className = "inactivo"
    nocturno = JSON.parse(storage.getItem("nocturno"));
    if (nocturno == false){
        contador.className = "contador"
        finalizar.className = "control"
        uno.className = "paso";
        dos.className = "paso-actual";
    }
    else {
        contador.className = "contador-noc"
        finalizar.className = "control-noc"
        uno.className = "paso-noc";
        dos.className = "paso-actual-noc";
    }
    conteo();
})

finalizar.addEventListener("click", (e) => {
    recorder.stopRecording();
    console.log("finalizado");
    finalizar.className = "inactivo";
    contador.className = "inactivo";
    nocturno = JSON.parse(storage.getItem("nocturno"));
    if (nocturno == false){
        repetir.className = "repetir";
        subir.className = "control";
    }
    else {
        repetir.className = "repetir-noc";
        subir.className = "control-noc";
    }
    detener();
})

repetir.addEventListener("click", (e) => {
    recorder.reset();
    repetir.className = "inactivo";
    subir.className = "inactivo";
    nocturno = JSON.parse(storage.getItem("nocturno"));
    if (nocturno == false){
        grabar.className = "control";
        tres.className = "paso";
        uno.className = "paso-actual";
    }
    else {
        grabar.className = "control-noc";
        tres.className = "paso-noc";
        uno.className = "paso-actual-noc";
    }
})

subir.addEventListener("click", async (e) => {
    fondo.className = "fondo-gif"
    subir.className = "inactivo"
    repetir.className = "inactivo"
    nocturno = JSON.parse(storage.getItem("nocturno"));
    if (nocturno == false){
        dos.className = "paso";
        tres.className = "paso-actual";
    }
    else {
        dos.className = "paso-noc";
        tres.className = "paso-actual-noc";
    }
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log()
    const subirResponse = await fetch(`https://upload.giphy.com/v1/gifs?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK`, {method: 'POST', body: form});
    const subirJson = await subirResponse.json();
    gifId = subirJson.data.id;
    idArray.push(gifId)
    storage.setItem("creados", JSON.stringify(idArray));
    botones.className = "contenedor-botones";
    infoGif.innerHTML = `
    <img class="fondo-img" src="./images/check.svg" alt="cargando">
    <p>GIFO subido con éxito</p>
    `;
})

descargar.addEventListener("click", async (e) => {
    const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK`);
    const buscarJson = await buscarResponse.json();
    descarga(buscarJson.data.images.original.url)
});