const historyContent = document.querySelector(".movie-list-grid");
const pagination_element = document.getElementById("pagination");
const category = document.querySelector(".category");
const countries = document.querySelector(".country");
let rows = 20;

const createCardHistory = (x) => {
  let card = document.createElement("div");
  card.className = "movie-search-card";
  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image skeleton";
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

async function displayCategory(list, categoryType,countryType, current_page) {
  historyContent.innerHTML = "";
  console.log(countryType)
  const res = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(categoryType) +"&country=" +
      encodeURIComponent(countryType) +
      "&page=" +
      current_page
  );
  list = [];
  console.log(res)

  const { content, totalPages } = await res.json();

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
  addActivityItem(category.value,countries.value);
});

// select Country
countries.addEventListener("click", function () {
  var options = countries.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    addActivityItem();
  }
});
countries.addEventListener("change", function () {
  addActivityItem(category.value,countries.value);
});


function addActivityItem(option,country) {
  historyContent.innerHTML = "";
  displayCategory(movieList, option,country, 0);
}
displayCategory(movieList, "", "",0);
