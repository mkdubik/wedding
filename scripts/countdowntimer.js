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


  var daysText = days === 1 ? i18n[currentLanguage]["day"] : i18n[currentLanguage]["days"]
  var hoursText = hours === 1 ? i18n[currentLanguage]["hour"] : i18n[currentLanguage]["hours"]
  var minutesText = minutes === 1 ? i18n[currentLanguage]["minute"] : i18n[currentLanguage]["minutes"]
  var secondsText = seconds === 1 ? i18n[currentLanguage]["second"] : i18n[currentLanguage]["seconds"]
  var extraCountDownTimer = i18n[currentLanguage]["extraCountDownTimer"]

  document.getElementById("countdown").innerHTML = days + " " + daysText + " "+ hours + " " + hoursText + " "
  + minutes + " " + minutesText + " " + seconds + " " + secondsText + " " + extraCountDownTimer;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = i18n[currentLanguage]["countdown-finished"];
  }
}, 1000);
