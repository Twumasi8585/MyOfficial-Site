
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



(function () {
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
};









