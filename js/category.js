let pagi_range = 8

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
const pagination_cate = document.getElementById("pagination");
const category = document.querySelector(".category");
const countries = document.querySelector(".country");
const prev_btn_cate = document.querySelector("#prev");
const next_btn_cate = document.querySelector("#next");
let currentPage_cate = 0;
let currentStartIndex_cate = 0

fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=2a51e561a490f304053dd6d7c06dbe16&language=en-US")
.then(response => response.json())
.then(json => {
    var html = ''
    var length = json.genres.length
    for (let i=0; i < length; i++) {
      var genre_name = json.genres[i].name
    html += '<option value="'+genre_name+'">'+genre_name+'</option>'
    }
    document.querySelector("#category").innerHTML += html
})

async function getCountry() {
  const languageList = await fetch("../../language.json").then(res => res.json()).then(content => content.languages)

  let total = languageList.length
  let languageCode = []
  let map = new Map();
  for (let i =0; i< total; i++) {
    languageCode.push(languageList[i].code)
    map.set(languageList[i].code,languageList[i].name)
  }
  const {totalPages} = await fetch("https://dramaholic.herokuapp.com/api/movies").then(res => res.json())
  let haveCountry = []
  for (let j=0; j<totalPages; j++) {
    await fetch("https://dramaholic.herokuapp.com/api/movies?page="+j)
    .then(respone => respone.json())
    .then(json => json.content)
    .then(content => {
      let length = content.length
      for(let i=0; i<length; i++) {
        if (!haveCountry.includes(content[i].country)) {
          haveCountry.push(content[i].country)
        }
        if (haveCountry.length == total) break
      }
    })
  }
  let html = ''
  for (let i=0; i<haveCountry.length;i++) {
    html += `<option value=${haveCountry[i]}>${map.get(haveCountry[i])}</option>`
  }
  document.querySelector("#country").innerHTML += html
}

function checkPrev_cate() {
  if(currentStartIndex_cate == 0) prev_btn_cate.setAttribute("hidden",true)
  else prev_btn_cate.removeAttribute("hidden")
}

function checkNext_cate() {
  fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value))
  .then((respone) => respone.json())
  .then((data) => {
    if((currentStartIndex_cate+pagi_range) > data.totalPages) next_btn_cate.setAttribute("hidden",true)
    else next_btn_cate.removeAttribute("hidden")
  });
}

prev_btn_cate.onclick = () => {
  currentStartIndex_cate -= pagi_range
  checkPrev_cate()
  next_btn_cate.removeAttribute("hidden")
  pagination_cate.innerHTML = "";
  for (let i = currentStartIndex_cate; i < currentStartIndex_cate+pagi_range; i++) {
    let btn = PaginationButton_cate(i);
    pagination_cate.appendChild(btn);
  }
}

next_btn_cate.onclick = () => {
  currentStartIndex_cate += pagi_range
  fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value))
  .then((respone) => respone.json())
  .then((data) => {
    pages = data.totalPages
    if((currentStartIndex_cate+pagi_range) > pages) next_btn_cate.setAttribute("hidden",true)
    else next_btn_cate.removeAttribute("hidden")
    prev_btn_cate.removeAttribute("hidden")

    pagination_cate.innerHTML = "";
    let end_index = (currentStartIndex_cate + pagi_range) > pages ? pages : (currentStartIndex_cate + pagi_range)
    for (let i = currentStartIndex_cate; i < end_index; i++) {
      let btn = PaginationButton_cate(i);
      pagination_cate.appendChild(btn);
    }
  });

}

function SetupPagination_cate(end_index) {
  checkPrev_cate()
  checkNext_cate()
  pagination_cate.innerHTML = "";
  for (let i = currentStartIndex_cate; i < end_index; i++) {
    let btn = PaginationButton_cate(i);
    pagination_cate.appendChild(btn);
  }
}

function PaginationButton_cate(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page+1;

  if (currentPage_cate == page) button.classList.add("active");

  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagenumbers button.active");
    if(prev_active != null) prev_active.classList.remove("active");

    currentPage_cate = button.innerText - 1;
    displayCards(false)

    button.classList.add("active");
  });

  return button;
}

async function displayCards(isNew) {
  categoryContent.innerHTML = "";
  const res = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value) +
      "&page=" +
      currentPage_cate
  );
  let list = [];

  const { content, totalPages } = await res.json();
  let end_index = (currentStartIndex_cate + pagi_range) > totalPages ? totalPages : (currentStartIndex_cate + pagi_range)

  if (isNew) SetupPagination_cate(end_index)

  for (let i = 0; i < content.length; i++) {
    await list.push(createCardHistory(content[i]));
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


// select category
category.addEventListener("click", function () {
  var options = category.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    category.value = ""
    displayCards(true);
  }
});
category.addEventListener("change", function () {
  reloadFilter()
});

// select Country
countries.addEventListener("click", function () {
  var options = countries.querySelectorAll("option");
  var count = options.length;
  if (typeof count === "undefined" || count < 2) {
    countries.value = ""
    displayCards(true);
  }
});

countries.addEventListener("change", function () {
  reloadFilter()
});

function reloadFilter() {
  currentPage_cate = 0
  currentStartIndex_cate = 0
  displayCards(true);
}






//-------------------------------------------------
//-------------------------------------------------
//---------------SEARCH--------------------------
let searchWrapper = document.querySelector(".search-box");
let inputValue = searchWrapper.querySelector("input");
const searchContent = document.querySelector(".search-content");
const mainContent = document.querySelector("main");
const logo = document.querySelector(".image-container");
const footer = document.querySelector("footer");
const isHover = (e) => e.parentElement.querySelector(":hover") === e;
const emptyPage = document.querySelector(".error-search-page");
const searchBar = document.querySelector(".search-bar");
const navBar = document.querySelector(".navbar");
const paginationSearch = document.querySelector(".pagination-search");
const prev_btn_search = document.querySelector("#prevs");
const next_btn_search = document.querySelector("#nexts");
const pagiBar_search = document.querySelector(".pagination-bar.search");
let currentPage_search = 0;
let currentStartIndex_search = 0
let current_search = ""

function checkPrev_search() {
  if(currentStartIndex_search == 0) prev_btn_search.setAttribute("hidden",true)
  else prev_btn_search.removeAttribute("hidden")
}

async function checkNext_search() {
  await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      current_search +
      "&page=" +
      currentPage_search
  )
  .then((respone) => respone.json())
  .then((data) => {
    if((currentStartIndex_search+pagi_range) > data.totalPages) next_btn_search.setAttribute("hidden",true)
    else next_btn_search.removeAttribute("hidden")
  });
}

prev_btn_search.onclick = () => {
  currentStartIndex_search -= pagi_range
  checkPrev_search()
  next_btn_search.removeAttribute("hidden")
  paginationSearch.innerHTML = "";
  for (let i = currentStartIndex_search; i < currentStartIndex_search+pagi_range; i++) {
    let btn = PaginationButton(i);
    paginationSearch.appendChild(btn);
  }
}

next_btn_search.onclick = async () => {
  currentStartIndex_search += pagi_range
  await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      current_search +
      "&page=" +
      currentPage_search
  )
  .then((respone) => respone.json())
  .then((data) => {
    pages = data.totalPages
    if((currentStartIndex_search+pagi_range) > pages) next_btn_search.setAttribute("hidden",true)
    else next_btn_search.removeAttribute("hidden")
    prev_btn_search.removeAttribute("hidden")

    paginationSearch.innerHTML = "";
    let end_index = (currentStartIndex_search + pagi_range) > pages ? pages : (currentStartIndex_search + pagi_range)
    for (let i = currentStartIndex_search; i < end_index; i++) {
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

async function getMovieListSearch(isNew) {
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" +
      current_search +
      "&page=" +
      currentPage_search
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
    // No result found , display cute cat
    searchContent.style.display = "none";
    pagiBar_search.classList.add("hidden")
    emptyPage.classList.remove("hidden");
    navBar.style.position = "relative";
  }
  if (!isEmpty(searchContent.childNodes)) {
    emptyPage.classList.add("hidden");
    let end_index = (currentStartIndex_search + pagi_range) > totalPages ? totalPages : (currentStartIndex_search + pagi_range)
    if (isNew) SetupPagination(end_index)
    searchContent.style.display = "grid";
    pagiBar_search.classList.remove("hidden")
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
  pagiBar_search.classList.add("hidden")
}

function SetupPagination(end_index) {
  checkPrev_search()
  checkNext_search()
  paginationSearch.innerHTML = "";
  for (let i = currentStartIndex_search; i < end_index; i++) {
    let btn = PaginationButton(i);
    paginationSearch.appendChild(btn);
  }
  
}

function PaginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page+1;

  if (currentPage_search == page) button.classList.add("active");

  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagination-search button.active");
    if(prev_active != null) prev_active.classList.remove("active");

    currentPage_search = button.innerText - 1;
    getMovieListSearch(false)

    button.classList.add("active");
  });

  return button;
} 

inputValue.addEventListener("input", (e) => {
  current_search = e.target.value;
  if (current_search) {
    currentPage_search = 0
    currentStartIndex_search = 0
    getMovieListSearch(true);
  } else {
    disableSearch();
  }
});



////////////////////////////////
async function init() {
  mainContent.style.display = "none";
  document.querySelector(".hidable").classList.add("hidden")
  document.querySelector("#waitingText").classList.remove("hidden")
  emptyPage.classList.remove("hidden");
  searchWrapper.classList.add("hidden")
  // navBar.style.position = "relative";
  await getCountry()

  emptyPage.classList.add("hidden");
  searchWrapper.classList.remove("hidden")
  document.querySelector("#waitingText").classList.add("hidden")
  document.querySelector(".hidable").classList.remove("hidden")
  footer.style.display = "block";
  mainContent.style.display = "block";

  displayCards(true)

}

init()