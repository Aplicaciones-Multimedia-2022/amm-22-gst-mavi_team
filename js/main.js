/*Constantes*/

const borde = 25;
const ancho = 50;
const zona = 100;


/*Variables*/

document.getElementById("nombre").innerHTML = getNombre('username');

var canvas = document.getElementById('campo');
var ctx = canvas.getContext('2d');
var frameNo = 0;
var nivel = 1;
var nmonedas = 0;

//Variables para los obstáculos
var obsHX,obsHY;
var obsVX,obsVY;
var obsAbuela = new Image;
var obsAbuelo = new Image;
var obstaculosH = [];
var obstaculosV = [];
var empezar = false;



tiempo = 0;

/*Objetos*/

var jugador = {
    x: zona / 2,
    y: campo.height / 2,
    img: new Image(),
    bono: false,

    dibujarJugador: function () {
        
        jugadorESRC = localStorage.getItem('imagen');
        jugador.img.src = jugadorESRC;
        ctx.drawImage(jugador.img,jugador.x,jugador.y,ancho,ancho);
        canvas.style.cursor = "none";

    },

    colisionJugador: function(x){
       
        if(jugador.bono){                //Colisiona con tren                           
    
        }else{
            if(x > (campo.width - 2*zona - borde)){                //Colisionar borde
                jugador.x = campo.width - 2*zona - 3*borde;
            }
        }
    }
};

var tren = {
    x: 850,
    y: 0,
    img: new Image,
    tocaTren : false,

    dibujarTren: function (){
        tren.img.src = '../img/trenes1.png';
        ctx.drawImage(tren.img, tren.x, tren.y, campo.width - 850, campo.height);
    },

    colisionTren: function (x){
        if(jugador.bono){
            if(x > (campo.width - 80)){
                window.location.href = 'hasGanado.html';
            }
        }
    }
};

var rail = {
    x: 760,
    y: 0,
    img: new Image,

    dibujarRail: function (){
        rail.img.src = '../img/tracks.png';
        ctx.drawImage(rail.img, rail.x, rail.y, campo.width - 700, campo.height);
    }
};

var torno = {
    x: campo.width - 2*zona - borde,
    y: 0,
    img: new Image,

    dibujarTorno: function (){
        if(jugador.bono){
            torno.img.src = null;
            sonido.tornito.play();
        }else{
            torno.img.src = '../img/torno1.jpg';
        }
        ctx.drawImage(torno.img, torno.x, torno.y, ancho, campo.height);
    }
};

var zonaS = {
    x: 30,
    y: 0,
    img: new Image,

    dibujarZona: function (){
        zonaS.img.src = "../img/barranym.png";
        ctx.drawImage(zonaS.img,zonaS.x,zonaS.y,100,campo.height);
        sonido.zonaSeguridad.play();
    }
};

var ladron = {
    x: nAleatorio(zonaS.x + ancho + zona, campo.width - 2*zona - ancho - borde),
    y: nAleatorio(ancho + borde, campo.height - ancho - borde),
    img: new Image,
    velx: 3,
    vely: 3,
    ultimaRobada: Date.now(),

    dibujarLadron: function (){
        ladron.img.src = '../img/ladron.png';
        ctx.drawImage(ladron.img, ladron.x, ladron.y, ancho, ancho);
    },

    bordesLadron: function (){
        if(jugador.bono){
            if((ladron.x < (zona + zonaS.x)) || (ladron.x > (campo.width - borde - ancho))){
                ladron.velx = -ladron.velx;
            }
        }else{
            if((ladron.x < (zona + zonaS.x)) || (ladron.x > (campo.width - 2*zona - borde - ancho))){
                ladron.velx = -ladron.velx;
            }
        }
        
        if(ladron.y <  ancho|| (ladron.y > (campo.height - ancho))){
            ladron.vely = -ladron.vely;
        }
    },

    //Ladrón roba monedas con las que choca (en el canvas)
    robaMoneda: function (){                                                               
        if((ladron.x < (moneda.x + ancho)) && (ladron.x > (moneda.x - ancho))){
            if((ladron.y < (moneda.y + ancho)) && (ladron.y > (moneda.y - ancho))){
                aleatoriaM();
            }
        }
    },
    colisionLadron: function (x, y) {
        if( dist(x, y, ladron.x, ladron.y) < borde){
            var ahora = Date.now();
            var diferencia = ahora - this.ultimaRobada;
            if (nmonedas > 0 && diferencia > 1000) { // 1000 milisegundos
                ladron.velx = -ladron.velx;
                ladron.vely = -ladron.vely;
                nmonedas--;
                this.ultimaRobada = Date.now();
            }
        }
    }

};



var moneda = {
    x: nAleatorio(zonaS.x + zona, campo.width - 2*zona - 2*borde),
    y: nAleatorio(borde, campo.height - 2*borde),
    img: new Image,

    dibujarMoneda: function (){
        if(jugador.bono){
            moneda.img.src = null;
        }else{
            moneda.img.src = '../img/moneda.png';
        }
        ctx.drawImage(moneda.img, moneda.x, moneda.y, borde, borde)
    },

    colisionMoneda: function (x, y){
        if((x < (moneda.x + ancho)) && (x > (moneda.x - borde))){
            if((y < (moneda.y + ancho)) && (y > (moneda.y - borde))){
                sonido.moneda.play();
                nmonedas++;
                aleatoriaM();
            }
        }
        niveles(nmonedas);
        document.getElementById("monedas").innerHTML = nmonedas;
    }
};

var sonido = {
    moneda: new Audio('../sonido/Moneda.mp3'),
    tornito: new Audio('../sonido/torno.wav'),
    zonaSeguridad: new Audio('../sonido/trenpasando.mp4'),
};


/*Main*/

function main(){
    empezar = true;

    obsHX = canvas.height;
    obsHY = canvas.width;

    obsVX = canvas.height;
    obsVY = canvas.width;
    
    setInterval(dibujar, 10);
    setInterval(creaObstaculo, 1000);
    setTimeout(contar,1000);
}

function dibujar() {
    clear();

    ladron.x += ladron.velx;
    ladron.y += ladron.vely;

    //Dibujar
    
    moneda.dibujarMoneda();
    torno.dibujarTorno();
    dibujarO();
    dibujarOV();
    zonaS.dibujarZona();
    rail.dibujarRail();
    tren.dibujarTren();
    jugador.dibujarJugador();
    ladron.dibujarLadron();

    //Colisiones:

    ladron.bordesLadron();
    ladron.robaMoneda();

    jugador.colisionJugador(jugador.x);
    moneda.colisionMoneda(jugador.x, jugador.y);
    tren.colisionTren(jugador.x);
    colisionAbuelaH(jugador.x, jugador.y);
    colisionAbuelaV(jugador.x, jugador.y);
    if(nivel % 2 == 0){
        ladron.colisionLadron(jugador.x, jugador.y);
    }
}
    
/*Constructor de obstáculos*/

function obst (posJugadorX, posJugadorY) {                        
    this.posJugadorX = posJugadorX;
    this.posJugadorY = posJugadorY;
}


/*Dibujar obstáculos*/
function dibujarO(){
    for(var i = 0; i < obstaculosH.length; i++) {
        ctx.drawImage(obsAbuela, obstaculosH[i].obsHX + (zona-borde), obstaculosH[i].obsHY - borde, 3*ancho, 2*ancho);
        if(nivel ==1){
            obstaculosH[i].obsHX -= 1.5;
        }else if(nivel == 2){
            obstaculosH[i].obsHX -= 2.5;
        }else if(nivel == 3){
            obstaculosH[i].obsHX -= 3;
        }else if(nivel == 4){
            obstaculosH[i].obsHX -= 4;
        }
        if(obstaculosH[i].obsHX < 0) {
            obstaculosH.splice(i,1);
        }
      
    }

}

function dibujarOV(){
    for( i = 0; i < obstaculosV.length; i++){
        ctx.drawImage(obsAbuelo, obstaculosV[i].obsVY +zona, obstaculosV[i].obsVX +zona, 3*ancho, 2*ancho);
        if(nivel == 1){
            obstaculosV[i].obsVX +=5.5;
        }else if(nivel == 2){
            obstaculosV[i].obsVX +=5.5;
        }else if(nivel == 3){
            obstaculosV[i].obsVX -=2;
        }else if(nivel == 4){
            obstaculosV[i].obsVX -=2;
        }
        if(obstaculosV[i].obsVY < 0){
            obstaculosV.splice(i,1);
        } 
    }
}

/*Obstaculos*/
function creaObstaculo (){                                          //Crea las abuelas
    var obstA = new obst (obsHX, obsHY);
    var obstB = new obst (obsVX, obsVY);
    obsAbuela.src = '../img/abuela1.png';
    obsAbuelo.src = '../img/abuelo.png';
    obstA.obsHX = campo.width - 250;
    obstA.obsHY = Math.floor(Math.random() * (campo.height-50));
    obstB.obsVX = campo.width - 250;
    obstB.obsVY = Math.floor(Math.random() * (campo.height-50));
    obstaculosH.push(obstA);
    obstaculosV.push(obstB);
}

function colisionAbuelaH(x,y){
    for(i = 0; i < obstaculosH.length;i++){
        if(((obstaculosH[i].obsHX - (x-ancho) < borde) && (( x- (obstaculosH[i].obsHX + 3*ancho)) < borde))){
            if(((x+ancho) < obstaculosH[i].obsHX) || (x > (obstaculosH[i].obsHX + 3*ancho))){
                if(((y > obstaculosH[i].obsHY) && (y + ancho) < (obstaculosH[i].obsHY +2*ancho))|| ((y > obstaculosH[i].obsHY) &&((y+ancho) < (obstaculosH[i].obsHY+2*ancho)))){
                    obstaculosH.splice(i,1);
                    tiempo++;
                }
            }
        }
    }
}

function colisionAbuelaV(x,y){
    for(i = 0; i < obstaculosV.length;i++){
        if((obstaculosV[i].obsVY - (x - ancho) < borde) && ((x - (obstaculosV[i].obsVY + 3*ancho)< borde))){
            if((((obstaculosV[i].obsVX - (y-borde-ancho))<borde) &&  ((y-borde - (obstaculosV[i].obsVX + 2*ancho)) < borde))){
                if((x > obstaculosV[i].obsVY + 3*ancho) || ((x+ancho)< obstaculosV[i].obsVY)){
                    if(((y+ancho) < obstaculosV[i].obsVX + 2*ancho) || (obstaculosV[i].obsVX < y)){
                        obstaculosV.splice(i,1);
                        tiempo++;
                    }
                }
            } 
        }    
    }
}

/*Niveles*/
function niveles(nmonedas){
    if(nmonedas == 10){
        nivel = 2;  
    }
    if(nmonedas == 20){
        nivel = 3;
    }
    if(nmonedas == 30){
        nivel = 4;
    }
    if(nmonedas == 40){
        jugador.bono = true;
        document.getElementById("bono").innerHTML = "Cargado";
    }
    document.getElementById("nivel").innerHTML = nivel;
}

/*Movimiento jugador*/
document.addEventListener("mousemove", moverJ, false);

function moverJ(e){
    var ratonX = e.pageX - campo.offsetLeft;
    var ratonY = e.pageY - campo.offsetTop;

    if(ratonX > 0 && ratonX < campo.width-45){
        jugador.x = ratonX - 10;
    }

    if(ratonY > 5 && ratonY < campo.height-40){
        jugador.y = ratonY - 10;
    } 
}

/*Contador*/
function contar(){
    tiempo++;
    document.getElementById("contador1").innerHTML = String(tiempo);
    if(tiempo>0){
        setTimeout(contar,1000);
    }

    if((tiempo > 15) && (nmonedas <10)){
        window.location.href = "gameOver.html";
    }else if((tiempo > 30) && (nmonedas <20)){
        window.location.href = "gameOver.html";
    }else if((tiempo >45 ) && (nmonedas <30)){
        window.location.href = "gameOver.html";
    }else if(tiempo == 60){
        window.location.href = "gameOver.html";
    }   
}

/*Auxiliares*/

function aleatoriaM(){                                                      //Aleatorizar moneda
    moneda.x = nAleatorio(zonaS.x + zona, campo.width - 2*zona - 2*borde);
    moneda.y = nAleatorio(borde, campo.height - 2*borde);
}

function nAleatorio(min, max) {                                             //Número aleatorio
    return Math.random() * (max - min) + min;
}

function clear(){                                                           //Limpiar canvas
    ctx.clearRect(0, 0, campo.width, campo.height);
}

function dist(x1, y1, x2 ,y2){
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt(a*a + b*b);
}

/*Relacionados con HTML(página inicio)*/

function getNombre(name, url){
    if (!url){
        url = window.location.href;
    } 

    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);

    if (!results){
        return null;
    } 
    if (!results[2]){
        return '*indefinido*';
    } 
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function apareceFormulario(id){
    var newNombre = document.getElementById(id);
    if(newNombre.className == 'nombre'){
        newNombre.className = '';
        
    }else{
        newNombre.className = 'nombre';
    }
}

function desaparecePersonaje() {
    var x = document.getElementById("elegirP");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/*Elegir personaje*/
function botonNino(){

    document.getElementById("fraseP").innerHTML = "Niño";


    var imagenNiño = new Image();
    imagenNiño.src = '../img/chico.png';

    localStorage.setItem("imagen",imagenNiño.src);

}

function botonNina(){

   document.getElementById("fraseP").innerHTML = "Niña";

   var imagenNiña = new Image();
   imagenNiña.src = '../img/chica.png';

   localStorage.setItem("imagen",imagenNiña.src);
   
}
    

function botonPerro(){

    document.getElementById("fraseP").innerHTML = "Perro";

    var imagenPerro = new Image();
    imagenPerro.src = '../img/icono.png';

    localStorage.setItem("imagen",imagenPerro.src);

}

    
