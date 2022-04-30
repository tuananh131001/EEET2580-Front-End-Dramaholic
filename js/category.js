const historyContent = document.querySelector(".movie-list-grid");
const pagination_element = document.getElementById("pagination");
let current_page = 0;
let rows = 5;

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
const movieList = [];

const category = document.querySelector(".category");

function SetupPagination(items, wrapper, pages, categoryType) {
  wrapper.innerHTML = "";
  for (let i = 1; i < pages + 1; i++) {
    let btn = PaginationButton(i, items, categoryType);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items, categoryType) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page - 1) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page - 1;
    displayCategory(items, categoryType, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

async function displayCategory(list, categoryType, current_page) {
  historyContent.innerHTML = "";
  const res = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(categoryType) +
      "&page=" +
      current_page
  );
  list = [];

  const { content, totalPages } = await res.json();

  console.log(totalPages);
  for (let i = 0; i < content.length; i++) {
    await list.push(createCardHistory(content[i]));
  }
  SetupPagination(list, pagination_element, totalPages, categoryType);
  for (let i = 0; i < list.length; i++) {
    historyContent.appendChild(list[i]);
  }
}

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
  displayCategory(movieList, option, 1);
}
displayCategory(movieList, "", 1);
