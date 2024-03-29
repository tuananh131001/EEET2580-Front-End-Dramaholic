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
  img.className = "thumbTile__image skeleton";
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
  button.onclick = function () {
    location.href = "/pages/movie/movie_detail.html?dbid=" + x.dbID;
  };
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
    slidesPerGroup: 2,
    freeMode: true,
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

async function getKorea(data) {
  const koreaData = await data.json();
  const koreaArray = await koreaData.content;
  const movieListElementKo = createMovieList("Top 10 in Korea");
  for (let i = 0; i < koreaArray.length; i++) {
    const movieL = createElementsMovieCard(koreaArray[i]);
    movieListElementKo.appendChild(movieL);
  }
}
async function getEN(data) {
  const USAData = await data.json();
  const USAArray = await USAData.content;
  const movieListElementEn = createMovieList("Top 10 in USA");
  for (let i = 0; i < USAArray.length; i++) {
    const movieL = createElementsMovieCard(USAArray[i]);
    movieListElementEn.appendChild(movieL);
  }
}
async function getES(data) {
  const ESData = await data.json();
  const ESArray = await ESData.content;
  const movieListElementEs = createMovieList("Top 10 in Latin");
  for (let i = 0; i < ESArray.length; i++) {
    const movieL = createElementsMovieCard(ESArray[i]);
    movieListElementEs.appendChild(movieL);
  }
}

async function getTrending() {
  // const reponse = await fetch("https://articulate-bot-415803.as.r.appspot.com/api/movies");
  // const data = await reponse.json();
  // const totalPages = await data.totalPages;
  // const billboardVideo = await getBillboardVideo();
  let movieArray = [];

  // Promise.all(
  //   pageArray.map(async (url) => {
  await Promise.all([
    fetch(
      "https://articulate-bot-415803.as.r.appspot.com/api/movies/search?country=ko&size=10"
    ).then((resp) => getKorea(resp)),
    fetch(
      "https://articulate-bot-415803.as.r.appspot.com/api/movies/search?country=en&size=10"
    ).then((resp) => getEN(resp)),
    fetch(
      "https://articulate-bot-415803.as.r.appspot.com/api/movies/search?country=es&size=10"
    ).then((resp) => getES(resp)),
  ])
    .then(() => {
      const loading = document.querySelector(".error-search-page");
      loading.classList.add("hidden")
      // Loading Screen
      setSwiper();
    })
    .catch((err) => console.log(err));
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

openSearch = () => {
  const subNav = document.querySelector(".search-bar");
  if (subNav.style.width === "") {
    // subNav.style.display = "block";
    subNav.style.width = "88%";
    subNav.classList.add("animate-fade-right");
  } else {
    // subNav.style.display = "none";
    subNav.style.width = "";
    subNav.classList.remove("animate-fade-right");
  }
  subNav.value = "";
  mainContent.style.display = "block";
  searchContent.innerHTML = "";
};

getTrending();
