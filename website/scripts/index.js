//Functions for creating an interactive slideshow
var slideIndex = 1;
var timeOut;
showSlides(slideIndex);

function plusSlides(n) {
	clearTimeout(timeOut);
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	clearTimeout(timeOut);
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
	timeOut = setTimeout(() => plusSlides(1), 5000); //Increments slide every 5 seconds automatically, timer is reset whenever a slide is manually selected
}

	//Functions for the login page
	