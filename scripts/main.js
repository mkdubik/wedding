// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function() {
  AOS.init({
    // uncomment below for on-scroll animations to played only once
    // once: true
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});

// Photo Filter
var activeFilter = "all";

$(".ww-filter-button").on("click", function(e) {
  // remove btn-primary from all buttons first
  $(".ww-filter-button").removeClass("btn-primary");
  $(".ww-filter-button").addClass("btn-outline-primary");

  // add btn-primary to active button
  var button = $(this);
  button.removeClass("btn-outline-primary");
  button.addClass("btn-primary");
  filterItems(button.data("filter"));
  e.preventDefault();
});

function filterItems(filter) {
  if (filter === activeFilter) {
    return;
  }

  activeFilter = filter;
  $(".ww-gallery .card").each(function() {
    var card = $(this);
    var groups = card.data("groups");
    var show = false;
    if (filter === "all") {
      show = true;
    } else {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i] === filter) {
          show = true;
        }
      }
    }
    // hide everything first
    card.fadeOut(400);
    setTimeout(function() {
      if (show && !card.is(":visible")) {
        card.fadeIn(400);
      }
    }, 500);
  });
}

// Light Box
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

window.addEventListener("load", function() {
  const form = document.getElementById('rsvp-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const button = document.getElementById('rsvp-submit-button');
    button.disabled = true;
    button.innerText = 'Er að senda..'
    const form = document.getElementById('rsvp-form');
    const data = new FormData(form);

    data.delete('btnradio')
    const accept = document.getElementById('rsvp-accept-button').checked
    data.append("Accept", accept)

    const action = form.action;
    fetch(action, {
      method: 'POST',
      body: new URLSearchParams(data),
    })
    .then(function (a) {
        return a.json();
    })
    .then(function (json) {
        console.log(json)
        switch (json.code) {
          case 400:
            button.innerText = 'Vantar upplýsingar fyrir svar. Fylltu inn Nafn, Símanúmer, Tölvupóstfang, Heimilisfang og lagið sem kemur þér á dansgólfið. Reyndu svo aftur.'
            button.disabled = false;
            return
          case 409:
            button.innerText = 'Nafn er nú þegar skráð. Hafðu samband við okkur ef það þarf að breyta skráninguni eða ef þú kannast ekki við skráninguna'
            return
          case 500:
            button.innerText = 'Eitthvað hefur farið úrskeiðis. Hafðu samband við okkur svo að hægt sé að skrá þig'
            return
          default:
            button.innerText = accept ? 'Svar skráð. Við hlökkum til að sjá þig á deginum okkar' : 'Svar skráð. Okkur þykir það leitt að þú kemst ekki'
            return
        }
    })
  });
});

// Set the date we're counting down to
var countDownDate = new Date("Jul 26, 2025 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("countdown").innerHTML = days + " dagar " + hours + " klukkustundir "
  + minutes + " mínútur " + seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Brúðkaupið okkar er búið";
  }
}, 1000);
