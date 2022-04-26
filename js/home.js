const movieListElement = document.querySelector(".movie-list");

const createMovieList = (title) => {
  let movieSection = document.createElement("div");
  movieSection.classList.add("movie-section");
  movieListElement.appendChild(movieSection);

  // Title
  let sliderHeading = document.createElement("h2");
  sliderHeading.classList.add("thumbTitle");
  sliderHeading.textContent = title;
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
  let title = document.createElement("h1");
  title.className = "card-title";
  title.textContent = x.title;
  cardContent.appendChild(title);
  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = x.description;
  cardContent.appendChild(description);

  // Button
  let button = document.createElement("button");

  button.textContent = "More Detail";
  button.className = "button";
  button.onclick = function () {
    localStorage.setItem("dbid", x.dbID);
    location.href = "pages/movie/movie_detail.html";
  };
  cardContent.appendChild(button);

  return col;
};
// Billboard
function setdbID() {
  localStorage.setItem("dbid", 99966);
  location.href = "pages/movie/movie_detail.html";
}

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
  const totalPages = await data.totalPages;
  const billboardVideo = await getBillboardVideo();
  let movieArray = [
    "https://dramaholic.herokuapp.com/api/movies/search?sort=rating&desc",
    "https://dramaholic.herokuapp.com/api/movies/search?sort=date&asc",
    "https://dramaholic.herokuapp.com/api/movies/search?sort=rating&desc"
  ];

  let titleIndex = 0;
  let movieListTitle = ["Highest Rating", "New Release", "Movie"];
  Promise.all(
    movieArray.map(async (url) => {
      // Get data
      const reponse = await fetch(url);
      const json = await reponse.json();
      const embedded = await json.content;
      const movieListElement = createMovieList(movieListTitle[titleIndex]);

      // Get movie and put in container
      const movies = embedded.forEach((movie) => {
        const movieL = createElementsMovieCard(movie);
        movieListElement.appendChild(movieL);
      });
      // Loading Screen
      const loading = document.querySelector("#loading");
      loading.style.display = "none";

      setSwiper();
      titleIndex++;
    })
  );
}
async function getBillboardVideo() {
  // const random = Math.floor(Math.random() * movieArray.length);
  const url = await fetch("https://dramaholic.herokuapp.com/api/movies/99966");
  const movie = await url.json();

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

const openNav = () => {
  const subNav = document.querySelector("#sideNav");
  subNav.style.width === ""
    ? (subNav.style.width = "60%")
    : (subNav.style.width = "");
  const input = document.querySelector(".search-bar");
  input.nodeValue = "";
};

getTrending();
