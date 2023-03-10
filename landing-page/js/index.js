// ----- Nav Burger Menu -----

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector("header").classList.toggle("open");
    document.querySelector("body").classList.toggle("disable-scroll");
  });
});

// ----- Slider -----
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  // let i;
  let slides = document.getElementsByClassName("slides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
}
