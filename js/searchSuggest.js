let searchWrapper = document.querySelector(".search-container");
let inputValue = searchWrapper.querySelector("input");
let suggest = searchWrapper.querySelector(".auto-box");
const searchContent = document.querySelector(".search-content");
const mainContent = document.querySelector("main");
let titleList = [];

const createMovieCard = (x) => {
  let wrapper = document.createElement("div")
  let card = document.createElement("div");
  card.className = "search-movie-list";
  wrapper.appendChild(card)

  // Image
  let img = document.createElement("img");
  img.className = "movie-image";
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
    localStorage.setItem("dbid", x.dbID)
    location.href = "/pages/movie/movie_detail.html";
  };
  cardContent.appendChild(button);

  return wrapper.innerHTML;
};
async function searchSuggest(suggestionList, title) {
  const reponse = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" + title
  );
  const { content } = await reponse.json();
  content.forEach((movie) => {
     suggestionList.push(createMovieCard(movie))
  });
  listData = await suggestionList.join('');
  console.log(suggestionList)
  mainContent.style.display = "none";
  searchContent.innerHTML = listData;

}

inputValue.onkeyup = (e) => {
  let current_search = e.target.value;
  const suggestionList = [];
  titleList = [];
  if (current_search) {
    searchSuggest(suggestionList, current_search);
  }else {
    mainContent.style.display = "block";
    searchContent.innerHTML = ""
  }
};
