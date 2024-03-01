let user = localStorage.getItem("UserID");
if (user == "" || user == null) {
  window.location.replace("../../index.html");
} else {
  // let current_user = sessionStorage.getItem('UserID')
  fetch(`https://articulate-bot-415803.as.r.appspot.com/api/customers/${user}`)
    .then((response) => response.json())
    .then((user) => {
      let insertname = document.querySelectorAll(
        ".navigation-menu-profile-name"
      );
      for (let i = 0; i < insertname.length; i++) {
        insertname[i].innerHTML = "Hi, " + user.username.toUpperCase();
      }

      if (user.admin == true) {
        let a = document.querySelectorAll(".admin-dashboard");
        for (let i = 0; i < a.length; i++) {
          a[i].removeAttribute("hidden");
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const account_navi = document.querySelector(".account-wrapper");

account_navi.onclick = () => {
  let check = document.querySelector(".drop-down.hidden");
  if (check != null)
    document.querySelector(".drop-down").classList.remove("hidden");
  else document.querySelector(".drop-down").classList.add("hidden");
};

const pageNumbers = document.querySelector(".pagenumbers");
const prev_btn = document.querySelector("#prev");
const next_btn = document.querySelector("#next");
var list = [];
const movie_per_page = 8;
const page_per_pagination = 8;
var totalMovies;
var totalPages;
var currentPage = 0;
//initial end page
var endPage = page_per_pagination;
//initial start page
var startPage = 0;

const createCardHistory = (x) => {
  let card = document.createElement("div");
  card.className = "movie-search-card";
  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image";
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
  fetch(x._links.self.href)
    .then((res) => res.json())
    .then((x) => {
      img.onclick = function () {
        location.href = "/pages/movie/movie_detail.html?dbid=" + x.dbID;
      };
      title.onclick = function () {
        location.href = "/pages/movie/movie_detail.html?dbid=" + x.dbID;
      };
    });
  return card;
};

const userID = localStorage.getItem("UserID");
const watchLaterContent = document.querySelector(".movie-list-grid");

async function getWatchLaterList(isNew) {
  //if get movie for the first time
  if (isNew) {
    const url = await fetch(
      "https://articulate-bot-415803.as.r.appspot.com/api/customers/" + userID + "/watchLater"
    );
    const { _embedded } = await url.json();
    const { movies } = await _embedded;
    // set total number of movie
    totalMovies = movies.length;

    if (totalMovies != 0) {
      prev_btn.style.display = "block";
      next_btn.style.display = "block";
    } else return;

    //push movies to list
    for (let i = totalMovies - 1; i >= 0; i--) {
      await list.push(createCardHistory(movies[i]));
    }
  }

  //display movie
  watchLaterContent.innerHTML = "";
  let currentStartIndex = currentPage * movie_per_page;
  for (let i = currentStartIndex; i < currentStartIndex + movie_per_page; i++) {
    await watchLaterContent.appendChild(list[i]);
    if (i + 1 == list.length) break;
  }

  // set up pagination
  createPagination();
}

function createPagination() {
  // find total pages enough for the movies list
  if (totalMovies <= movie_per_page) totalPages = 1;
  else {
    totalPages = Math.floor(totalMovies / movie_per_page);
    if (totalMovies % movie_per_page > 0) totalPages += 1;
  }

  pageNumbers.innerHTML = "";
  //set startPage and endPage to range the pagination
  if (totalPages > page_per_pagination) {
    if (currentPage + 1 >= page_per_pagination) {
      startPage =
        Math.floor(currentPage / page_per_pagination) * page_per_pagination;
      endPage = startPage + page_per_pagination;
      if (endPage > totalPages) endPage = totalPages;
    }
  } else endPage = totalPages;

  //set button
  for (let i = startPage; i < endPage; i++) {
    let btn = SetPaginationButton(i);
    pageNumbers.appendChild(btn);
  }
}

function SetPaginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page + 1;

  if (currentPage == page) button.classList.add("active");

  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagination-btn .active");
    if (prev_active != null) prev_active.classList.remove("active");
    currentPage = button.innerText - 1;
    getWatchLaterList(false);
    button.classList.add("active");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  //check prev and next button
  if (startPage == 0) prev_btn.classList.add("hidden");
  else prev_btn.classList.remove("hidden");
  if (endPage >= totalPages) next_btn.classList.add("hidden");

  return button;
}

next_btn.onclick = () => {
  startPage = endPage;
  if (endPage + page_per_pagination <= totalPages)
    endPage += page_per_pagination;
  else endPage = totalPages;
  pageNumbers.innerHTML = "";
  for (let i = startPage; i < endPage; i++) {
    console.log(startPage);
    let btn = SetPaginationButton(i);
    console.log(btn);
    pageNumbers.appendChild(btn);
  }
};

prev_btn.onclick = () => {
  endPage = startPage;
  startPage -= page_per_pagination;
  next_btn.classList.remove("hidden");
  pageNumbers.innerHTML = "";
  for (let i = startPage; i < endPage; i++) {
    console.log(startPage);
    let btn = SetPaginationButton(i);
    console.log(btn);
    pageNumbers.appendChild(btn);
  }
};

async function init() {
  await getWatchLaterList(true);
  console.log("Watch later: " + totalMovies);

  if (totalPages <= page_per_pagination) {
    prev_btn.setAttribute("hidden", true);
    next_btn.setAttribute("hidden", true);
  }
}

init();
