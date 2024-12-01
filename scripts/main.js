// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function() {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true
  }); // initialize animate on scroll library
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
        });
    });
});


/*
// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
*/
