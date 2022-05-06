const historyContent = document.querySelector(".movie-list-grid");
const pagination_element = document.getElementById("pagination");
const createCardHistory = (x) => {
  let card = document.createElement("div");
  card.className = "movie-search-card";
  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image";
  img.src = x.thumbnail;
  img.onclick = function () {
    localStorage.setItem("dbid", x.dbID);
    location.href = "/pages/movie/movie_detail.html";
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
    location.href = "/pages/movie/movie_detail.html";
  };
  cardContent.appendChild(title);

  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = x.originalTitle;
  cardContent.appendChild(description);

  return card;
};
const userID = localStorage.getItem("UserID")
async function getMovieListSearch(list) {
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/customers/" + userID + "/history"
  );
  const { _embedded } = await url.json();
  const  history  = await _embedded.movies;
  console.log(history)
  for (let i = 0; i < history.length; i++) {
    await list.push(createCardHistory(history[i]));
  }
  for (let i = 0; i < list.length; i++) {
    await historyContent.appendChild(list[i]);
  }
}

const movieList = [];
getMovieListSearch(movieList);
