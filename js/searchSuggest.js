let searchWrapper = document.querySelector(".search-container");
let inputValue = searchWrapper.querySelector("input");
let suggest = searchWrapper.querySelector(".auto-box");
const searchContent = document.querySelector(".search-content");
const mainContent = document.querySelector("main");
let titleList = [];

const createMovieCard = (x) => {
  let wrapper = document.createElement("div");
  let card = document.createElement("div");
  card.className = "movie-search-card";
  wrapper.appendChild(card);

  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image";
  img.src = x.thumbnail;
  img.onclick = function () {
    localStorage.setItem("dbid", x.dbID);
    location.href = "../pages/movie/movie_detail.html";
  };
  card.appendChild(img);

  var cardContent = document.createElement("div");
  cardContent.className = "card-content";
  card.appendChild(cardContent);

  // Title
  let title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = x.title;
  title.onclick = function () {
    localStorage.setItem("dbid", x.dbID);
    location.href = "../pages/movie/movie_detail.html";
  };
  cardContent.appendChild(title);

  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = x.originalTitle;
  cardContent.appendChild(description);

  return wrapper;
};
async function searchSuggest(suggestionList, title) {
  searchContent.innerHTML = ""
  const reponse = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" + title
  );
  const { content } = await reponse.json();
  content.forEach((movie) => {
    suggestionList.push(createMovieCard(movie));
  });
  mainContent.style.display = "none";
  suggestionList.forEach((movie) => {
    searchContent.appendChild(movie);
  });

}

inputValue.onkeyup = (e) => {
  let current_search = e.target.value;
  const suggestionList = [];
  titleList = [];
  if (current_search) {
    searchSuggest(suggestionList, current_search);
  } else {
    mainContent.style.display = "block";
    searchContent.innerHTML = "";
  }

};
