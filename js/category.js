let pagi_range = 8;

const openNav = () => {
  const subNav = document.querySelector("#sideNav");
  subNav.style.width === ""
    ? (subNav.style.width = "60%")
    : (subNav.style.width = "");
  const input = document.querySelector(".search-bar");
  input.nodeValue = "";
};

//-------------------------------------------------
//-------------------------------------------------
//---------------CATEGORY--------------------------
const categoryContent = document.querySelector(".movie-list-grid");
const pagi_bar = document.querySelector(".pagination-bar.cate");
const pagination_cate = document.getElementById("pagination");
const category = document.querySelector(".category");
const countries = document.querySelector(".country");
const from_year = document.querySelector(".from_year");
const to_year = document.querySelector(".to_year");
const sortby = document.querySelector(".sort");
// const isAdult = document.querySelector(".adult");
const prev_btn_cate = document.querySelector("#prev");
const next_btn_cate = document.querySelector("#next");
// Search
let searchWrapper = document.querySelector(".search-box");
let inputValue = searchWrapper.querySelector("input");
const searchContent = document.querySelector(".search-content");
const searchBar = document.querySelector(".search-bar");
const logo = document.querySelector(".image-container");
const navBar = document.querySelector(".navbar");
const mainContent = document.querySelector("main");
const emptyPage = document.querySelector(".error-search-page");
// const paginationSearch = document.querySelector(".pagination-search");
const prevs_btn = document.querySelector("#prevs");
const nexts_btn = document.querySelector("#nexts");


let current_search = "";
let currentPage_cate = 0;
let currentStartIndex_cate = 0;
let total_pages = 0;

fetch(
  "https://api.themoviedb.org/3/genre/tv/list?api_key=2a51e561a490f304053dd6d7c06dbe16&language=en-US"
)
  .then((response) => response.json())
  .then((json) => {
    var html = "";
    var length = json.genres.length;
    for (let i = 0; i < length; i++) {
      var genre_name = json.genres[i].name;
      html += '<option value="' + genre_name + '">' + genre_name + "</option>";
    }
    document.querySelector("#category").innerHTML += html;
  });

async function getCountry() {
  //get country name to use later
  const languageList = await fetch("../../language.json")
    .then((res) => res.json())
    .then((content) => content.languages);
  let total = languageList.length;
  let map = new Map();
  for (let i = 0; i < total; i++) {
    map.set(languageList[i].code, languageList[i].name);
  }

  //make links to fetch
  const { totalPages } = await fetch(
    "https://dramaholic.herokuapp.com/api/movies"
  ).then((res) => res.json());
  let urls = [];
  for (let i = 0; i < totalPages; i++) {
    urls.push(`https://dramaholic.herokuapp.com/api/movies?page=${i}`);
  }

  //get all country codes we have
  let haveCountry = new Set();
  await Promise.all(urls.map((u) => fetch(u)))
    .then((resp) => Promise.all(resp.map((r) => r.json())))
    .then((json) => Promise.all(json.map((j) => j.content)))
    .then((content) => {
      for (let i = 0; i < totalPages; i++) {
        let pageContent = content[i];
        let len = content[i].length;
        for (let j = 0; j < len; j++) haveCountry.add(pageContent[j].country);
      }
    });

  // make select options
  let html = "";
  for (let item of haveCountry.keys()) {
    html += `<option value=${item}>${map.get(item)}</option>`;
  }
  document.querySelector("#country").innerHTML += html;
}

async function getTotalPages(mode) {
    let res = await fetch(
      "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
        encodeURIComponent(category.value) +
        "&country=" +
        encodeURIComponent(countries.value) +
        "&title=" +
        encodeURIComponent(current_search) +
        "&dateGT=" +
        encodeURIComponent(from_year.value) +
        "&dateLTE=" +
        encodeURIComponent(to_year.value)
        )
    const {totalPages} = await res.json()
    total_pages = totalPages
}

function checkPrev_cate() {
  if (currentStartIndex_cate == 0) prev_btn_cate.setAttribute("hidden", true);
  else prev_btn_cate.removeAttribute("hidden");
}

function checkNext_cate() {
  if (currentStartIndex_cate + pagi_range >= total_pages)
    next_btn_cate.setAttribute("hidden", true);
  else next_btn_cate.removeAttribute("hidden");
}

prev_btn_cate.onclick = () => {
  currentStartIndex_cate -= pagi_range;
  checkPrev_cate();
  next_btn_cate.removeAttribute("hidden");
  pagination_cate.innerHTML = "";
  for (
    let i = currentStartIndex_cate;
    i < currentStartIndex_cate + pagi_range;
    i++
  ) {
    let btn = PaginationButton_cate(i);
    pagination_cate.appendChild(btn);
  }
};

next_btn_cate.onclick = () => {
  currentStartIndex_cate += pagi_range;
  let end_index =
    currentStartIndex_cate + pagi_range >= total_pages
      ? total_pages
      : currentStartIndex_cate + pagi_range;
  SetupPagination_cate(end_index)
};

function SetupPagination_cate(end_index) {
  checkPrev_cate();
  checkNext_cate();
  pagination_cate.innerHTML = "";
  for (let i = currentStartIndex_cate; i < end_index; i++) {
    let btn = PaginationButton_cate(i);
    pagination_cate.appendChild(btn);
  }
}

function PaginationButton_cate(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page + 1;

  if (currentPage_cate == page) button.classList.add("active");

  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagenumbers button.active");
    if (prev_active != null) prev_active.classList.remove("active");

    currentPage_cate = button.innerText - 1;
    displayCards(false);

    button.classList.add("active");
  });

  return button;
}
function isEmpty(value) {
  return (
    Boolean(value && typeof value === "object") && !Object.keys(value).length
  );
}
async function displayCards(isNew) {
  const res = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value) +
      "&page=" +
      currentPage_cate +
      "&title=" +
      encodeURIComponent(current_search) +
      "&dateGT=" +
      encodeURIComponent(from_year.value) +
      "&dateLTE=" +
      encodeURIComponent(to_year.value) +
      "&sort=" +
      encodeURIComponent(sortby.value)
  );

  const { content, totalPages } = await res.json();
  let list = [];
  categoryContent.innerHTML = "";
  let end_index =
    currentStartIndex_cate + pagi_range >= totalPages
      ? totalPages
      : currentStartIndex_cate + pagi_range;

  if (isNew) {
    total_pages = totalPages;
    SetupPagination_cate(end_index);
  }

  for (let i = 0; i < content.length; i++) {
    list.push(createCardHistory(content[i]));
  }
  for (let i = 0; i < list.length; i++) {
    categoryContent.appendChild(list[i]);
  }

}

const createCardHistory = (x) => {
  let card = document.createElement("div");
  card.className = "movie-search-card";
  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image skeleton";
  img.src = x.thumbnail;
  img.onclick = function () {
    location.href = "/pages/movie/movie_detail.html?dbid=" + x.dbID;
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
    location.href = "/pages/movie/movie_detail.html?dbid=" + x.dbID;
  };
  cardContent.appendChild(title);

  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = x.originalTitle;
  cardContent.appendChild(description);

  return card;
};

// select category
category.addEventListener("click", function () {
  var options = category.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    category.value = "";
    displayCards(true);
  }
});
category.addEventListener("change", function () {
  reloadFilter();
});

// select Country
countries.addEventListener("click", function () {
  var options = countries.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    countries.value = "";
    displayCards(true);
  }
});
countries.addEventListener("change", function () {
  reloadFilter();
});

// // select Country
// from_year.addEventListener("change", function () {
//   if (parseInt(from_year.value) > parseInt(to_year.value)) {
//     to_year.value = ""
//   }
//   reloadFilter();
// });

// select sort
sortby.addEventListener("click", function () {
  var options = category.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    category.value = ""
    displayCards(true);
  }
});
sortby.addEventListener("change", function () {
  reloadFilter()
});

from_year.addEventListener("change", function () {
  reloadFilter()
});

to_year.addEventListener("change", function () {
  reloadFilter()
});

function reloadFilter() {
  currentPage_cate = 0;
  currentStartIndex_cate = 0;
  displayCards(true);
}

inputValue.addEventListener("input", (e) => {
  current_search = e.target.value;
  if (current_search) {
    
    reloadFilter();
    // pagi_bar.classList.remove("hidden");
  } else {
    disableSearch();
  }
});

function openSearch() {
  // media query to check
  var media_query = "screen and (max-width:1023px)";
  // matched or not
  var matched = window.matchMedia(media_query).matches;
  !matched
    ? searchBar.classList.add("transition")
    : searchBar.classList.remove("transition");
  matched && !searchBar.classList.contains("open")
    ? logo.classList.add("hidden")
    : logo.classList.remove("hidden");
  !searchBar.classList.contains("open")
    ? searchBar.classList.add("open")
    : searchBar.classList.remove("open");
  searchBar.value = "";
  disableSearch();
}

function disableSearch() {
  // No Input in search bar
  navBar.style.position = "fixed";
  mainContent.style.display = "block";
  emptyPage.classList.add("hidden");
  // pagi_bar.classList.add("hidden");
}

////////////////////////////////
async function init() {
  displayCards(true);
  await getCountry();
}

init();
