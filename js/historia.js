var aText = new Array(
    "Es un lunes a las 8 de la mañana y te encuentras en la estación",
    "de MAVI dispuesto a coger el metro. Desafortunadamente, hay un grupo", 
    "de abuelas que te impiden el paso, sumándote tiempo y un ladrón con", 
    "la intención de dejarte sin dinero para que recargues tu bono.", 
    "Con todo esto, ¿Serás capaz de llegar a tiempo a clase?",
);

var iSpeed = 50; 
var iIndex = 0;
var iArrLength = aText[0].length;
var iScrollAt = 20;
     
var iTextPos = 0;
var sContents = ''; 
var iRow; 


function escribir(){
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
    var destination = document.getElementById("historia");
     
    while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout("escribir()", 500);
        }
    }else {
      setTimeout("escribir()", iSpeed);
    }
}

escribir();

