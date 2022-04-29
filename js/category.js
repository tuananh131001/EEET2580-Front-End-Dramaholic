const historyContent = document.querySelector(".movie-list-grid");
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
async function displayCategory(list, categoryType) {
  const res = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" + encodeURIComponent(categoryType)
  );
  const { content } = await res.json();
  for (let i = 0; i < content.length; i++) {
    await list.push(createCardHistory(content[i]));
  }
  for (let i = 0; i < list.length; i++) {
    await historyContent.appendChild(list[i]);
  }
}

const movieList = [];

const category = document.querySelector(".category");
// select category
category.addEventListener("click", function () {
  var options = category.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    addActivityItem();
  }
});

category.addEventListener("change", function () {
  addActivityItem(category.value);
});

function addActivityItem(option) {
  historyContent.innerHTML = "";
  displayCategory(movieList, option);
}
