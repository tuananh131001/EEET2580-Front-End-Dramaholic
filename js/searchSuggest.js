let searchWrapper = document.querySelector(".search-box");
let inputValue = searchWrapper.querySelector("input");
const searchContent = document.querySelector(".search-content");
const mainContent = document.querySelector("main");
const logo = document.querySelector(".image-container");
const footer = document.querySelector("footer");
let titleList = [];
const isHover = (e) => e.parentElement.querySelector(":hover") === e;
const emptyPage = document.querySelector(".error-search-page");
const myDiv = document.querySelector(".icon");
const searchBar = document.querySelector(".search-bar");
const navBar = document.querySelector(".navbar");
const paginationSearch = document.querySelector(".pagination-search");

const createCardSearch = (x) => {
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
function isEmpty(value) {
  return (
    Boolean(value && typeof value === "object") && !Object.keys(value).length
  );
}

function openSearch() {
  // media query to check
  var media_query = "screen and (min-width:320px) and (max-width:1023px)";
  // matched or not
  var matched = window.matchMedia(media_query).matches;
  matched && !searchBar.classList.contains("open")
    ? logo.classList.add("hidden")
    : logo.classList.remove("hidden");
  !searchBar.classList.contains("open")
    ? searchBar.classList.add("open")
    : searchBar.classList.remove("open");
  searchBar.value = "";
  disableSearch();
}
async function getMovieListSearch(title, list, current_page) {
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      title +
      "&page=" +
      current_page
  );
  const { content, totalPages } = await url.json();
  list = [];
  searchContent.innerHTML = "";
  for (let i = 0; i < content.length; i++) {
    await list.push(createCardSearch(content[i]));
  }
  for (let i = 0; i < list.length; i++) {
    await searchContent.appendChild(list[i]);
  }
  //Check no result
  if (isEmpty(searchContent.childNodes)) {
    // No result found , display cat
    searchContent.style.display = "none";
    paginationSearch.style.display = "none";
    emptyPage.classList.remove("hidden");
    navBar.style.position = "relative";
  }
  if (!isEmpty(searchContent.childNodes)) {
    emptyPage.classList.add("hidden");
  }
  // Found results and display
  SetupPagination(list, paginationSearch, totalPages, title);
  searchContent.style.display = "grid";
  paginationSearch.style.display = "flex";
  footer.style.display = "block";
  mainContent.style.display = "none";
}

function disableSearch() {
  // No Input in search bar
  navBar.style.position = "fixed";
  mainContent.style.display = "block";
  emptyPage.classList.add("hidden");
  searchContent.innerHTML = "";
  searchContent.style.display = "none";
  paginationSearch.style.display = "none";
}
// Pagination
let current_page = 0;

function SetupPagination(items, wrapper, pages, categoryType) {
  wrapper.innerHTML = "";
  for (let i = 1; i < pages + 1; i++) {
    let btn = PaginationButton(i, items, categoryType);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items, title) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page - 1) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page - 1;
    getMovieListSearch(title, items, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

inputValue.addEventListener("input", (e) => {
  let current_search = e.target.value;
  const suggestionList = [];
  if (current_search) {
    getMovieListSearch(current_search, suggestionList, 0);
  } else {
    // No Input in search bar
    disableSearch();
  }
});
