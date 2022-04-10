

const filmContainer1 = document.querySelector(".korean");
const filmContainer2 = document.querySelector(".trending");
const createElements = (x) => {
  // swiper-slide
  var col = document.createElement("div");
  col.className = "swiper-slide";

  let card = document.createElement("div");
  card.className = "card";
  col.appendChild(card);

  // Image
  let img = document.createElement("img");
  img.className = "thumbTile__image";
  img.src = x.thumbnail;
  card.appendChild(img);

  var cardContent = document.createElement("div");
  cardContent.className = "card-content";
  card.appendChild(cardContent);

  // Title
  let title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = x.title;
  cardContent.appendChild(title);
  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = x.originalTitle;
  cardContent.appendChild(description);
  
  // Button
  let button = document.createElement("button");
  button.textContent = "More Detail";
  button.className = "button";
  cardContent.appendChild(button);

  return col;
};
// let filmClassstart =
//   '<div class="swiper-slide"><a class="thumbTile" href="#"><img class="thumbTile__image" src="';
// let filmClassend = '" alt="Suits"></a></div>';
let filmClassstart =
  '<div class="swiper-slide"><img class="thumbTile__image" src="';
let filmClassend = '"></div>';
test =
  "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/27/6aiiawke_1920x1080_conangxinhdep_296_168.webp";
fetch("https://dramaholic.herokuapp.com/api/movies")
  .then((respone) => respone.json())
  .then((data) => data._embedded)
  .then((embedded) => embedded.movies)
  .then((movies) => {
    movies.forEach((movie) => {
      // filmContainer1.innerHTML +=
      // filmClassstart + movie.thumbnail + filmClassend;
      const movieL = createElements(movie);
      filmContainer1.appendChild(movieL);
    });
  });

fetch("https://dramaholic.herokuapp.com/api/movies?page=1")
  .then((respone) => respone.json())
  .then((data) => data._embedded)
  .then((embedded) => embedded.movies)
  .then((movies) => {
    movies.forEach((movie) => {
      // filmContainer2.innerHTML +=
      // filmClassstart + movie.thumbnail + filmClassend;
      const movieL = createElements(movie);
      filmContainer2.appendChild(movieL);
    });
  });
// End Swipe
const swiper = new Swiper(".swiper", {
  // Optional parameters
  spaceBetween: 5,
  slidesPerView: 2,
  loop: true,
  freeMode: true,
  loopAdditionalSlides: 5,
  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      freeMode: false,
    },
  },
});

var myNav = document.querySelector('.navbar');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ) {
        myNav.classList.add("nav-colored");
        myNav.classList.remove("nav-transparent");
    } 
    else {
        myNav.classList.add("nav-transparent");
        myNav.classList.remove("nav-colored");
    }
};

openNav = () => {
  const subNav = document.querySelector("#sideNav");
  if(subNav.style.width === "")
      subNav.style.width = "80%";
  else
      subNav.style.width = "";
}
