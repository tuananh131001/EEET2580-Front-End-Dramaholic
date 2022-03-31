const filmContainer1 = document.querySelector(".korean");
const filmContainer2 = document.querySelector(".trending");

// let filmClassstart =
//   '<div class="swiper-slide"><a class="thumbTile" href="#"><img class="thumbTile__image" src="';
// let filmClassend = '" alt="Suits"></a></div>';
let filmClassstart =
  '<div class="swiper-slide"><img class="thumbTile__image" src="';
let filmClassend = '"></div>';
test = "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/27/6aiiawke_1920x1080_conangxinhdep_296_168.webp"
fetch("https://dramaholic.herokuapp.com/api/movies")
  .then((respone) => respone.json())
  .then((data) => data._embedded)
  .then((embedded) => embedded.movies)
  .then((movies) => {
    movies.forEach((movie) => {
      (filmContainer1.innerHTML += filmClassstart + movie.thumbnail + filmClassend)
    });
  });

  fetch("https://dramaholic.herokuapp.com/api/movies?page=1")
  .then((respone) => respone.json())
  .then((data) => data._embedded)
  .then((embedded) => embedded.movies)
  .then((movies) => {
    movies.forEach((movie) => {
      (filmContainer2.innerHTML += filmClassstart + movie.thumbnail + filmClassend)
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
