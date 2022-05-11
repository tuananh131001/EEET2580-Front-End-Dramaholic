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
    localStorage.setItem("dbid", x.dbID);
    location.href = "movie_detail.html";
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

async function getTrending() {
  // const reponse = await fetch("https://dramaholic.herokuapp.com/api/movies");
  // const data = await reponse.json();
  // const totalPages = await data.totalPages;
  // const billboardVideo = await getBillboardVideo();
  let movieArray = [];

  // Promise.all(
  //   pageArray.map(async (url) => {
  const url = "https://dramaholic.herokuapp.com/api/movies?page=0&size=100000";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const movieListElementKo = createMovieList("Top 10 in Korea");
      const movieListElementEn = createMovieList("Top 10 in USA");
      const movieListElementEs = createMovieList("Top 10 in Latin");

      let countTopKo = 0;
      let countTopUS = 0;
      let countTopEs = 0;
      let arraySort = json.content.sort((a, b) =>
        parseFloat(a.rating) < parseFloat(b.rating) ? 1 : -1
      );
      for (
        let i = 0;
        i < arraySort.length ||
        (countTopKo < 10 && countTopUS < 10 && countTopEs < 10);
        i++
      ) {
        if (arraySort[i].country == "ko" && countTopKo < 10) {
          const movieL = createElementsMovieCard(arraySort[i]);
          countTopKo++;
          movieListElementKo.appendChild(movieL);
        } else if (arraySort[i].country == "en" && countTopUS < 10) {
          const movieL = createElementsMovieCard(arraySort[i]);
          countTopUS++;
          movieListElementEn.appendChild(movieL);
        } else if (arraySort[i].country == "es" && countTopEs < 10) {
          const movieL = createElementsMovieCard(arraySort[i]);
          countTopEs++;
          movieListElementEs.appendChild(movieL);
        }
      }
      const loading = document.querySelector("#loading");
      loading.style.display = "none";
      // Loading Screen
      setSwiper();
    });
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
