/* Navbar Toggle Script  */


const navbarToggle = document.querySelector(".toggle");
const navbarLinks = document.querySelector(".nav-links");

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarLinks.classList.toggle('active');
});





/* Date Script */



  
        // Get the paragraph element
        const dateElement = document.getElementById("A");

        // Function to add the correct ordinal suffix
        function getOrdinal(day) {
            if (day >= 11 && day <= 13) {
                return "th";
            }

            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }

        // Function to display the current date
        function displayDate() {
            const today = new Date();

            const weekday = today.toLocaleDateString("en-GB", {
                weekday: "long"
            });

            const month = today.toLocaleDateString("en-GB", {
                month: "long"
            });

            const day = today.getDate();
            const year = today.getFullYear();

            // Build the formatted date
            dateElement.textContent =
                `${weekday}, ${day}${getOrdinal(day)} ${month} ${year}`;
        }

        // Run the function
        displayDate();






    



/* Portfolio B Script */




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
image: "Flyer10.jpg",
/*title: "Beautiful Journey",
description: "A final collection of moments worth remembering."*/
},

{
image: "Flyer2.jpg",
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

  




  

  
    
  
