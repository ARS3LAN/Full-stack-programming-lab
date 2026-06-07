$(document).ready(function(){

/* WATCH COLOR SWITCH */

$(".color").click(function(){

$(".color").removeClass("active");

$(this).addClass("active");

let newImage=$(this).data("img");

$("#watch-image").attr("src",newImage);

});


/* NAVBAR SHADOW ON SCROLL */

$(window).scroll(function(){

if($(window).scrollTop()>50){

$(".navbar").addClass("scrolled");

}else{

$(".navbar").removeClass("scrolled");

}

});


/* SMOOTH SCROLL NAVIGATION */

$(".nav-links a").click(function(e){

e.preventDefault();

let target=$(this).attr("href");

$('html, body').animate({
scrollTop: $(target).offset().top
},800);

});

});