const movieListElement = document.querySelector(".movie-list");

const createMovieList = (title) => {
  let movieSection = document.createElement("div");
  movieSection.className = "movie-section";
  movieListElement.appendChild(movieSection);

  // Title
  let sliderHeading = document.createElement("h2");
  sliderHeading.className = "thumbTitle ";
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
  card.className = "card skeleton";
  col.appendChild(card);
  // Image
  let img = document.createElement("img");
  img.className = "thumbTile__image skeleton";
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
    location.href = "/pages/movie/movie_detail.html";
  };
  cardContent.appendChild(button);

  return col;
};
// Billboard
function setdbID(x) {
  localStorage.setItem("dbid", x);
  location.href = "/pages/movie/movie_detail.html";
}

const movieList = [];

// End Swipe
async function setSwiper() {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    spaceBetween: 5,
    slidesPerView: 2,
    slidesPerGroup: 2,
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
let movieArray = [
  "https://dramaholic.herokuapp.com/api/movies?sort=rating,desc",
  "https://dramaholic.herokuapp.com/api/movies?sort=date,desc",
  "https://dramaholic.herokuapp.com/api/movies/search?genre=Drama&sort=date,desc",
  "https://dramaholic.herokuapp.com/api/movies/search?genre=Animation",
  "https://dramaholic.herokuapp.com/api/movies/search?country=ko&sort=date,desc",
];
let movieListTitle = [
  "Highest Rating",
  "New Release",
  "Lastest Drama Movies",
  "Animation",
  "Newest Korean Movie",
];
const movieSliders = [];
async function getAllMovie(i) {
  const response = await fetch(movieArray[i]);
  const json = await response.json();
  const embedded = await json.content;
  const movieListElement = createMovieList(movieListTitle[i]);
  Promise.all(
    embedded.map((movie) => {
      const movieL = createElementsMovieCard(movie);
      movieListElement.appendChild(movieL);
    })
  );

  setSwiper();
}
async function getTrending() {
  const reponse = await fetch("https://dramaholic.herokuapp.com/api/movies");
  const data = await reponse.json();
  const totalPages = await data.totalPages;
  const billboardVideo = await getBillboardVideo();

  await getAllMovie(0);
  const loading = document.querySelector("#loading");
  loading.style.display = "none";
  let scrollCount = 1;
  // media query to check
  var media_query = "screen and (min-width:320px) and (max-width:1023px)";
  // matched or not
  var matched = window.matchMedia(media_query).matches;
  if (matched) {
    for (let i = 1; i < movieListTitle.length; i++) {
      await getAllMovie(i);
    }
  } else {
    window.addEventListener("scroll", () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      console.log(scrollTop, clientHeight, scrollHeight);
      if (
        scrollTop + clientHeight >= scrollHeight - 400 &&
        scrollCount < movieListTitle.length
      ) {
        getAllMovie(scrollCount);
        scrollCount++;
      }
    });
  }
}
async function getBillboardVideo() {
  const movieBillboard = [99966, 76662, 2778, 1396];
  const random = Math.floor(Math.random() * movieBillboard.length);
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/" + movieBillboard[random]
  );
  const movie = await url.json();

  const videoContainer = document.querySelector(".billboard-video");
  const videoElement = document.createElement("iframe");
  const hrefArray = movie.href.split("https://www.youtube.com/watch?v=");
  videoElement.src =
    "https://www.youtube.com/embed/" +
    hrefArray[1] +
    "?modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1&mute=1&loop=1&end=136" +
    "&playlist=" +
    hrefArray[1];
  videoElement.classList.add("video-billboard");
  videoContainer.appendChild(videoElement);

  const billboardFilmName = document.querySelector(".billboard-film-name");
  billboardFilmName.innerHTML = movie.title;
  const description = document.querySelector(".billboard-description");
  description.innerHTML = movie.description;
  const button = document.querySelector(".button-container");
  button.innerHTML = `<button class="more-info" onclick="setdbID(${movieBillboard[random]})">
  <span class="ti-info-alt"></span> MORE INFO
</button>`;
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
