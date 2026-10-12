
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











       /* =========================================
SLIDE DATA
========================================= */

const gallerySlides = [
{
image: "Flyer1.png",
/*title: "Mountain Escape",
description: "Exploring dramatic landscapes and quiet places."*/
},

{
image: "Flyer4.png",
/*title: "Ocean Blue",
description: "A calm collection inspired by the sea."*/
},

{
image: "Flyer3.png",
/*title: "Modern Space",
description: "Architecture, geometry and contemporary design."*/
},

{
image: "Flyer5.png",
/*title: "Serene Woods",
description: "Natural textures surrounded by deep green."*/
},

{
image: "Flyer6.png",
/*title: "The Bride",
description: "A visual journey through untouched landscapes."*/
},

{
image: "Flyer7.png",
/*title: "The Groom",
description: "Leaving the familiar behind and discovering more."*/
},

{
image: "Flyer8.png",
/*title: "New Horizons",
description: "Finding new perspectives beyond the familiar."*/
},

{
image: "Flyer9.png",
/*title: "Happy Smiles",
description: "Minimal landscapes shaped by light and shadow."*/
},

{
image: "Fashion WD.jpg",
/*title: "Beautiful Journey",
description: "A final collection of moments worth remembering."*/
},

{
image: "AgricTech WD2.jpg",
/*title: "Love",
description: "A final collection of moments worth remembering."*/
}


];

/* =========================================
ELEMENT REFERENCES
========================================= */

const galleryElement =
document.getElementById("verticalGallery");

const galleryTrack =
document.getElementById("galleryTrack");

const previousButton =
document.getElementById("galleryPrevious");

const nextButton =
document.getElementById("galleryNext");

const counterElement =
document.getElementById("galleryCounter");

const progressBar =
document.getElementById("galleryProgressBar");

const progressNumber =
document.getElementById("galleryProgressNumber");

/* =========================================
VALIDATE REQUIRED ELEMENTS
========================================= */

if (
!galleryElement ||
!galleryTrack ||
!previousButton ||
!nextButton ||
!counterElement ||
!progressBar ||
!progressNumber
) {
console.error(
"Gallery slider: One or more required HTML elements are missing."
);
}

/* =========================================
SLIDER STATE
========================================= */

let activeSlide = 0;

let wheelLocked = false;

let touchStartY = 0;

let touchEndY = 0;

/* =========================================
CREATE SLIDES
========================================= */

function buildGallery() {

if (!galleryTrack) {
return;
}

galleryTrack.innerHTML = "";

gallerySlides.forEach((slide, index) => {

const card = document.createElement("article");

card.className = "gallery-card";

card.dataset.slideIndex = index;

card.setAttribute(
  "aria-label",
  `Slide ${index + 1}: ${slide.title}`
);


/* ---------------------------------------
   IMAGE
--------------------------------------- */

const image = document.createElement("img");

image.alt = slide.title;

image.draggable = false;

if (slide.image && slide.image.trim() !== "") {

  image.src = slide.image;

  image.loading =
    index === 0 ? "eager" : "lazy";

} else {

  /*
    Prevent broken-image icons when
    an image has not been supplied yet.
  */

  image.style.display = "none";

  card.classList.add(
    "gallery-card-no-image"
  );
}


/* ---------------------------------------
   CONTENT
--------------------------------------- */

const content =
  document.createElement("div");

content.className =
  "gallery-card-content";


const number =
  document.createElement("span");

number.className =
  "gallery-card-number";

number.textContent =
  String(index + 1).padStart(2, "0");


const title =
  document.createElement("h2");

title.textContent =
  slide.title;


const description =
  document.createElement("p");

description.textContent =
  slide.description;


/* ---------------------------------------
   BUILD CARD
--------------------------------------- */

content.appendChild(number);

content.appendChild(title);

content.appendChild(description);

card.appendChild(image);

card.appendChild(content);

galleryTrack.appendChild(card);


});

updateGallery();
}

/* =========================================
UPDATE GALLERY
========================================= */

function updateGallery() {

const cards =
galleryTrack.querySelectorAll(
".gallery-card"
);

const total =
cards.length;

if (total === 0) {
return;
}

cards.forEach((card, index) => {

let position =
  index - activeSlide;


/*
  Keep the slider circular.
*/

if (position > total / 2) {
  position -= total;
}

if (position < -total / 2) {
  position += total;
}


/*
  Vertical distance.
*/

const offset =
  position * 125;


/*
  Card scale.
*/

const scale =
  position === 0
    ? 1
    : Math.max(
        0.72,
        1 - Math.abs(position) * 0.08
      );


/*
  Card opacity.
*/

const opacity =
  Math.abs(position) > 2
    ? 0
    : Math.max(
        0.25,
        1 - Math.abs(position) * 0.25
      );


/*
  Card brightness.
*/

const brightness =
  position === 0
    ? 1
    : 0.55;


/*
  Layer order.
*/

const layer =
  10 - Math.abs(position);


/*
  Apply CSS variables.
*/

card.style.setProperty(
  "--card-offset",
  `${offset}px`
);

card.style.setProperty(
  "--card-scale",
  scale
);

card.style.setProperty(
  "--card-opacity",
  opacity
);

card.style.setProperty(
  "--card-brightness",
  brightness
);

card.style.setProperty(
  "--card-layer",
  layer
);


/*
  Accessibility:
  only the active card is exposed
  as the current slide.
*/

card.setAttribute(
  "aria-hidden",
  position === 0
    ? "false"
    : "true"
);


});

updateInformation(total);
}

/* =========================================
UPDATE COUNTER + PROGRESS
========================================= */

function updateInformation(total) {

const currentNumber =
String(activeSlide + 1)
.padStart(2, "0");

const totalNumber =
String(total)
.padStart(2, "0");

/*
Counter.
*/

if (counterElement) {

counterElement.textContent =
  `${currentNumber} / ${totalNumber}`;


}

/*
Progress number.
*/

if (progressNumber) {

progressNumber.textContent =
  currentNumber;


}

/*
Progress bar.
*/

if (progressBar) {

const percentage =
  ((activeSlide + 1) / total) * 100;

progressBar.style.width =
  `${percentage}%`;


}

}

/* =========================================
NEXT SLIDE
========================================= */

function goToNextSlide() {

const total =
gallerySlides.length;

if (total === 0) {
return;
}

activeSlide =
(activeSlide + 1) % total;

updateGallery();
}

/* =========================================
PREVIOUS SLIDE
========================================= */

function goToPreviousSlide() {

const total =
gallerySlides.length;

if (total === 0) {
return;
}

activeSlide =
(activeSlide - 1 + total) % total;

updateGallery();
}

/* =========================================
BUTTON EVENTS
========================================= */

if (nextButton) {

nextButton.addEventListener(
"click",
goToNextSlide
);

}

if (previousButton) {

previousButton.addEventListener(
"click",
goToPreviousSlide
);

}

/* =========================================
KEYBOARD CONTROLS
========================================= */

document.addEventListener(
"keydown",
(event) => {

/*
  Ignore keyboard controls when the user
  is typing into a form field.
*/

const activeElement =
  document.activeElement;

const isTyping =
  activeElement &&
  (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA" ||
    activeElement.tagName === "SELECT" ||
    activeElement.isContentEditable
  );


if (isTyping) {
  return;
}


switch (event.key) {

  case "ArrowDown":
  case "ArrowRight":

    event.preventDefault();

    goToNextSlide();

    break;


  case "ArrowUp":
  case "ArrowLeft":

    event.preventDefault();

    goToPreviousSlide();

    break;

}


}
);

/* =========================================
MOUSE WHEEL
========================================= */

if (galleryElement) {

galleryElement.addEventListener(
"wheel",
(event) => {

  /*
    Ignore tiny trackpad movements.
  */

  if (
    Math.abs(event.deltaY) < 10
  ) {
    return;
  }


  /*
    Prevent rapid slide changes.
  */

  if (wheelLocked) {
    return;
  }


  event.preventDefault();

  wheelLocked = true;


  if (event.deltaY > 0) {

    goToNextSlide();

  } else {

    goToPreviousSlide();

  }


  setTimeout(() => {

    wheelLocked = false;

  }, 650);

},
{
  passive: false
}


);

}

/* =========================================
TOUCH START
========================================= */

if (galleryElement) {

galleryElement.addEventListener(
"touchstart",
(event) => {

  if (
    !event.changedTouches.length
  ) {
    return;
  }


  touchStartY =
    event.changedTouches[0].screenY;

},
{
  passive: true
}


);

}

/* =========================================
TOUCH END
========================================= */

if (galleryElement) {

galleryElement.addEventListener(
"touchend",
(event) => {

  if (
    !event.changedTouches.length
  ) {
    return;
  }


  touchEndY =
    event.changedTouches[0].screenY;


  handleSwipe();

},
{
  passive: true
}


);

}

/* =========================================
HANDLE SWIPE
========================================= */

function handleSwipe() {

const distance =
touchStartY - touchEndY;

const minimumDistance = 50;

/*
Ignore small movements.
*/

if (
Math.abs(distance) <
minimumDistance
) {
return;
}

if (distance > 0) {

goToNextSlide();


} else {

goToPreviousSlide();


}

}

/* =========================================
CARD CLICK
========================================= */

if (galleryTrack) {

galleryTrack.addEventListener(
"click",
(event) => {

  const clickedCard =
    event.target.closest(
      ".gallery-card"
    );


  if (!clickedCard) {
    return;
  }


  const clickedIndex =
    Number(
      clickedCard.dataset.slideIndex
    );


  if (
    Number.isNaN(clickedIndex)
  ) {
    return;
  }


  /*
    If the clicked card is already
    active, do nothing.
  */

  if (
    clickedIndex === activeSlide
  ) {
    return;
  }


  activeSlide =
    clickedIndex;


  updateGallery();

}


);

}

/* =========================================
IMAGE ERROR HANDLING
========================================= */

if (galleryTrack) {

galleryTrack.addEventListener(
"error",
(event) => {

  if (
    event.target.tagName !== "IMG"
  ) {
    return;
  }


  /*
    Hide broken images instead of
    displaying a broken-image icon.
  */

  event.target.style.display =
    "none";


  const parentCard =
    event.target.closest(
      ".gallery-card"
    );


  if (parentCard) {

    parentCard.classList.add(
      "gallery-card-no-image"
    );

  }

},
true


);

}

/* =========================================
INITIALIZE
========================================= */

buildGallery(); 

  




  

  
    
  
