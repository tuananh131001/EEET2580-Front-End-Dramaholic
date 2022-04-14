const movieListElement = document.querySelector(".movie-list");

const createMovieList = (title) => {
  let movieSection = document.createElement("div");
  movieSection.classList.add("movie-section");
  movieListElement.appendChild(movieSection);

  // Title
  let sliderHeading = document.createElement("h2");
  sliderHeading.classList.add("thumbTitle");
  sliderHeading.textContent = "Page " + title;
  movieSection.appendChild(sliderHeading);

  // Class swiper
  let swiper = document.createElement("div");
  swiper.classList.add("swiper");
  movieSection.appendChild(swiper);

  let swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");
  swiper.appendChild(swiperWrapper);
  let swiperButtonPrev = document.createElement("div");
  swiperButtonPrev.classList.add("swiper-button-prev");
  swiper.appendChild(swiperButtonPrev);
  let swiperButtonNext = document.createElement("div");
  swiperButtonNext.classList.add("swiper-button-next");
  swiper.appendChild(swiperButtonNext);

  return swiperWrapper;
};

const createElementsMovieCard = (x) => {
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
// let filmClassstart =
//   '<div class="swiper-slide"><img class="thumbTile__image" src="';
// let filmClassend = '"></div>';
const movieList = [];

// End Swipe
async function setSwiper() {
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
}

async function getTrending() {
  const reponse = await fetch("https://dramaholic.herokuapp.com/api/movies");
  const data = await reponse.json();
  const totalPages = await data.page.totalPages;
  getBillboardVideo(data._embedded.movies);
  for (let i = 1; i < totalPages; i++) {
    const reponse = await fetch(
      "https://dramaholic.herokuapp.com/api/movies?page=" + i
    );
    const data = await reponse.json();
    const embedded = await data._embedded.movies;
    const movieListElement = await createMovieList(i);
    const movies = await embedded.forEach((movie) => {
      const movieL = createElementsMovieCard(movie);
      movieListElement.appendChild(movieL);
    });
  }
  setSwiper();
}
async function getBillboardVideo(movieArray) {
  // const random = Math.floor(Math.random() * movieArray.length);
  const movie = movieArray[0];

  const videoContainer = document.querySelector(".billboard-video");
  const videoElement = document.createElement("iframe");
  const hrefArray = movie.href.split("https://www.youtube.com/watch?v=");
  videoElement.src =
    "https://www.youtube.com/embed/" +
    hrefArray[1] +
    "?modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1&mute=1&loop=1" +
    "&playlist=" +
    hrefArray[1];
  videoElement.classList.add("video-billboard");
  videoContainer.appendChild(videoElement);

  const billboardFilmName = document.querySelector(".billboard-film-name");
  billboardFilmName.innerHTML = movie.title;
  const description = document.querySelector(".billboard-description");
  description.innerHTML = movie.description;
}

var myNav = document.querySelector(".navbar");
window.onscroll = function () {
  "use strict";
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    myNav.classList.add("nav-colored");
    myNav.classList.remove("nav-transparent");
  } else {
    myNav.classList.add("nav-transparent");
    myNav.classList.remove("nav-colored");
  }
};

openNav = () => {
  const subNav = document.querySelector("#sideNav");
  if (subNav.style.width === "") subNav.style.width = "80%";
  else subNav.style.width = "";
};

openSearch = () => {
  const subNav = document.querySelector(".search-bar");
  if (subNav.style.width === "") {
    // subNav.style.display = "block";
    subNav.style.width = "80%";
    subNav.classList.add("animate-fade-right");
  } else {
    // subNav.style.display = "none";
    subNav.style.width = "";
    subNav.classList.remove("animate-fade-right");
  }
};

getTrending();
