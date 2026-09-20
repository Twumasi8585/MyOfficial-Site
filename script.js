
const slides = document.querySelector(".slides");
if(slides){

const images = document.querySelectorAll(".slides img");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function showSlide(i){
if(i >= images.length) index = 0;
if(i < 0) index = images.length-1;
slides.style.transform = `translateX(-${index*100}%)`;

}

next.addEventListener("click", ()=>{
index++;
showSlide(index);

});

prev.addEventListener("click", ()=>{
index--;
showSlide(index);

});

setInterval(()=>{
index++;
showSlide(index);

},3000);

}





const navbarToggle = document.querySelector(".toggle");
const navbarLinks = document.querySelector(".nav-links");

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarLinks.classList.toggle('active');
});









const throttle = (callback, limit) => {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};















// Send Email



/*(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init("JEo-dElIm-gpMfClw");
})();

const msg = document.querySelector(".form-message");

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector(".loader").classList.add("show");
      
      // these IDs from the previous steps
      emailjs.sendForm("service_xy065ce", "template_unquwpy", this).then(
        function () {
          document.getElementById("contact-form").reset();
          document.querySelector(".loader").classList.remove("show");
          msg.innerHTML = "";
          msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
          msg.classList.add("show");
          setTimeout(() => msg.classList.remove("show"), 2000);
        },
        function (error) {
          document.querySelector(".loader").classList.toggle("show");
          msg.classList.add("show");
          msg.innerHTML += "<span class='error-msg'>Email Not Sent</span>";

        }
      );
    });
};*/






















    /*body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: "Segoe UI", Arial, sans-serif;
      color: var(--text);
      /*background:
        radial-gradient(circle at 15% 20%, #ffb6d9 0, transparent 28%),
        radial-gradient(circle at 85% 20%, #a997ff 0, transparent 30%),
        radial-gradient(circle at 50% 100%, #6dcfff 0, transparent 32%),
        linear-gradient(135deg, #7d70cf, #e98cb9 50%, #69bfe5);*/
        /*background: blue;
    }*/

  




  

  
    $(function () {

      let is24Hour = false;
      let previousDigits = {};

      const $clock = $(".clock");

      function pad(value) {
        return String(value).padStart(2, "0");
      }

      function getTime() {
        const now = new Date();

        let hours = now.getHours();
        let ampm = hours >= 12 ? "PM" : "AM";

        if (!is24Hour) {
          hours = hours % 12 || 12;
        }

        return {
          hours: pad(hours),
          minutes: pad(now.getMinutes()),
          seconds: pad(now.getSeconds()),
          ampm: ampm,
          date: now
        };
      }

      function createFlip($digit, newValue) {

        const $card = $digit.find(".cart7");

        const oldValue =
          $card.find(".digit-number").first().text();

        if (oldValue === newValue) {
          return;
        }

        // Remove an old animation if it exists.
        $card.find(".flip").remove();

        // Create the animated top half.
        const $flip = $("<div>", {
          class: "flip"
        });

        const $number = $("<span>", {
          class: "digit-number",
          text: oldValue
        });

        $flip.append($number);
        $card.append($flip);

        // Update the static number behind it.
        $card.find(".digit-number").not($flip.find(".digit-number"))
          .text(newValue);

        // Force browser reflow before animation.
        void $flip[0].offsetWidth;

        $flip.addClass("animate");

        // Clean up after animation.
        setTimeout(function () {
          $flip.remove();
        }, 560);
      }

      function updateClock() {

        const time = getTime();

        const digits = {
          hour1: time.hours.charAt(0),
          hour2: time.hours.charAt(1),
          minute1: time.minutes.charAt(0),
          minute2: time.minutes.charAt(1),
          second1: time.seconds.charAt(0),
          second2: time.seconds.charAt(1)
        };

        $.each(digits, function (unit, value) {

          const $digit = $('[data-unit="' + unit + '"]');

          if (
            previousDigits[unit] !== undefined &&
            previousDigits[unit] !== value
          ) {
            createFlip($digit, value);
          } else {
            $digit.find(".digit-number").text(value);
          }

          previousDigits[unit] = value;
        });

        $(".ampm").text(time.ampm);

        const dateString = time.date.toLocaleDateString(
          undefined,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        );

        $(".date").text(dateString);

        $(".ampm").toggle(!is24Hour);
      }

      $(".tog3").on("click", function () {

        is24Hour = !is24Hour;

        // Reset digit tracking so the newly formatted hour
        // doesn't produce an awkward transition.
        previousDigits = {};

        $(this).text(
          is24Hour
            ? "Switch to 12-hour"
            : "Switch to 24-hour"
        );

        updateClock();
      });

      updateClock();

      // Update frequently enough to keep the display synchronized.
      setInterval(updateClock, 250);

    });
  
