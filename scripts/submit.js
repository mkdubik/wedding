window.addEventListener("load", function() {
  const form = document.getElementById('intro-rsvp-form');

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const button = document.getElementById('rsvp-submit-button');
    button.disabled = true;
    button.innerText = i18n[currentLanguage]["submitting"]
    const form = document.getElementById('intro-rsvp-form');
    const data = new FormData(form);

    data.delete('btnradio')

    const accept = document.getElementById('rsvp-accept-button').checked
    const decline = document.getElementById('rsvp-decline-button').checked

    if (accept === false && decline === false) {
      button.innerText = i18n[currentLanguage]["missing-rsvp-status"]
      button.disabled = false;
      return
    }

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
            button.innerText = i18n[currentLanguage]["missing-form-data"]
            button.disabled = false;
            return
          case 409:
            button.innerText = i18n[currentLanguage]["name-conflict"]
            return
          case 500:
            button.innerText = i18n[currentLanguage]["unknown-error"]
            return
          default:
            button.innerText = accept ? i18n[currentLanguage]["accepted"] : i18n[currentLanguage]["rejected"]
            return
        }
    })
  });
});
