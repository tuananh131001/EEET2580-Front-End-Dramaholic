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
const paginationSearch = document.querySelector(".pagination-whole .pagination-search");
const prevs_btn = document.querySelector("#prevs");
const nexts_btn = document.querySelector("#nexts");
const pagi_bar = document.querySelector(".pagination-whole");
let current_page = 0;
let rows = 20;
let pagi_range = 8
let currentStartIndex = 0
let current_search = ""


function checkPrevs() {
  if(currentStartIndex == 0) prevs_btn.setAttribute("hidden",true)
  else prevs_btn.removeAttribute("hidden")
}

async function checkNexts() {
  await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      current_search +
      "&page=" +
      current_page
  )
  .then((respone) => respone.json())
  .then((data) => {
    if((currentStartIndex+pagi_range) > data.totalPages) nexts_btn.setAttribute("hidden",true)
    else nexts_btn.removeAttribute("hidden")
  });
}

prevs_btn.onclick = () => {
  currentStartIndex -= pagi_range
  checkPrevs()
  nexts_btn.removeAttribute("hidden")
  paginationSearch.innerHTML = "";
  for (let i = currentStartIndex; i < currentStartIndex+pagi_range; i++) {
    let btn = PaginationButton(i);
    paginationSearch.appendChild(btn);
  }
}

nexts_btn.onclick = async () => {
  currentStartIndex += pagi_range
  await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      current_search +
      "&page=" +
      current_page
  )
  .then((respone) => respone.json())
  .then((data) => {
    pages = data.totalPages
    if((currentStartIndex+pagi_range) > pages) nexts_btn.setAttribute("hidden",true)
    else nexts_btn.removeAttribute("hidden")
    prevs_btn.removeAttribute("hidden")

    paginationSearch.innerHTML = "";
    let end_index = (currentStartIndex + pagi_range) > pages ? pages : (currentStartIndex + pagi_range)
    for (let i = currentStartIndex; i < end_index; i++) {
      let btn = PaginationButton(i);
      paginationSearch.appendChild(btn);
    }
  });

}

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
  var media_query = "screen and (min-width:200px) and (max-width:1023px)";
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

async function getMovieListSearch(isNew) {
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      current_search +
      "&page=" +
      current_page
  );
  const { content, totalPages } = await url.json();

  let list = [];
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
    pagi_bar.classList.add("hidden")
    emptyPage.classList.remove("hidden");
    navBar.style.position = "relative";
  }
  if (!isEmpty(searchContent.childNodes)) {
    emptyPage.classList.add("hidden");
    let end_index = (currentStartIndex + pagi_range) > totalPages ? totalPages : (currentStartIndex + pagi_range)
    if (isNew) SetUpPagination(end_index)
    searchContent.style.display = "grid";
    pagi_bar.classList.remove("hidden")
    footer.style.display = "block";
    mainContent.style.display = "none";
  }
}

function disableSearch() {
  // No Input in search bar
  navBar.style.position = "fixed";
  mainContent.style.display = "block";
  emptyPage.classList.add("hidden");
  searchContent.innerHTML = "";
  searchContent.style.display = "none";
  pagi_bar.classList.add("hidden")
}

// function SetupPagination() {
//   wrapper.innerHTML = "";
//   for (let i = 1; i < pages + 1; i++) {
//     let btn = PaginationButton(i, items, categoryType);
//     wrapper.appendChild(btn);
//   }
// }

function SetUpPagination(end_index) {
  checkPrevs()
  checkNexts()
  paginationSearch.innerHTML = "";
  // let end_index = (currentStartIndex + pagi_range) > pages? pages : (currentStartIndex + pagi_range)
  for (let i = currentStartIndex; i < end_index; i++) {
    let btn = PaginationButton(i);
    paginationSearch.appendChild(btn);
  }
}

function PaginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page+1;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagination-search button.active");
    if(prev_active != null) prev_active.classList.remove("active");

    current_page = button.innerText - 1;
    getMovieListSearch(false)

    button.classList.add("active");
  });

  return button;
} 

inputValue.addEventListener("input", (e) => {
  current_search = e.target.value;
  if (current_search) {
    curren_page = 0
    currentStartIndex = 0
    getMovieListSearch(true);
  } else {
    // No Input in search bar
    disableSearch();
  }
});
