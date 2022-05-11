window.onscroll=function(){
    myFunction()
};
var menu  = document.getElementById("menu");
//necesitamos saber la distancia que hay entre el título y las cajitas

var altura = menu.offsetTop;


//cuando haga scroll se quede ahí
function myFunction(){
    if(window.pageYOffset>= altura) {
        menu.classList.add("fixed")
    } else {
        menu.classList.remove("fixed");
    }
}