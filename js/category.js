const historyContent = document.querySelector(".movie-list-grid");
const pagination_element = document.getElementById("pagination");
const category = document.querySelector(".category");
const countries = document.querySelector(".country");
const prev_btn = document.querySelector("#prev");
const next_btn = document.querySelector("#next");
let current_page = 0;
let rows = 20;
let pagi_range = 8
let current_start_index = 0

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

function checkPrev() {
  if(current_start_index == 0) prev_btn.setAttribute("hidden",true)
  else prev_btn.removeAttribute("hidden")
}

function checkNext() {
  fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value))
  .then((respone) => respone.json())
  .then((data) => {
    if((current_start_index+pagi_range) > data.totalPages) next_btn.setAttribute("hidden",true)
    else next_btn.removeAttribute("hidden")
  });
}

prev_btn.onclick = () => {
  current_start_index -= pagi_range
  checkPrev()
  next_btn.removeAttribute("hidden")
  pagination_element.innerHTML = "";
  for (let i = current_start_index; i < current_start_index+pagi_range; i++) {
    let btn = PaginationButton(i);
    pagination_element.appendChild(btn);
  }
}

next_btn.onclick = () => {
  current_start_index += pagi_range
  fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value))
  .then((respone) => respone.json())
  .then((data) => {
    pages = data.totalPages
    if((current_start_index+pagi_range) > pages) next_btn.setAttribute("hidden",true)
    else next_btn.removeAttribute("hidden")
    prev_btn.removeAttribute("hidden")

    pagination_element.innerHTML = "";
    let end_index = (current_start_index + pagi_range) > pages ? pages : (current_start_index + pagi_range)
    for (let i = current_start_index; i < end_index; i++) {
      let btn = PaginationButton(i);
      pagination_element.appendChild(btn);
    }
  });

}

function SetupPagination(end_index) {
  checkPrev()
  checkNext()
  pagination_element.innerHTML = "";
  // let end_index = (current_start_index + pagi_range) > pages? pages : (current_start_index + pagi_range)
  for (let i = current_start_index; i < end_index; i++) {
    let btn = PaginationButton(i);
    pagination_element.appendChild(btn);
  }
}

function PaginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page+1;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagenumbers button.active");
    if(prev_active != null) prev_active.classList.remove("active");

    current_page = button.innerText - 1;
    displayCards(false)

    button.classList.add("active");
  });

  return button;
}

async function displayCards(isNew) {
  historyContent.innerHTML = "";
  const res = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
      encodeURIComponent(category.value) +
      "&country=" +
      encodeURIComponent(countries.value) +
      "&page=" +
      current_page
  );
  list = [];

  const { content, totalPages } = await res.json();
  console.log(current_start_index + pagi_range, totalPages, (current_start_index + pagi_range) > totalPages)
  let end_index = (current_start_index + pagi_range) > totalPages ? totalPages : (current_start_index + pagi_range)
  console.log(end_index)

  if (isNew) SetupPagination(end_index)

  for (let i = 0; i < content.length; i++) {
    // console.log(content[i].id)
    await list.push(createCardHistory(content[i]));
  }
  for (let i = 0; i < list.length; i++) {
    historyContent.appendChild(list[i]);
  }
}

// async function displayCategory(list, categoryType, countryType, current_page) {
//   historyContent.innerHTML = "";
//   console.log(countryType);
//   const res = await fetch(
//     "https://dramaholic.herokuapp.com/api/movies/search?genre=" +
//       encodeURIComponent(categoryType) +
//       "&country=" +
//       encodeURIComponent(countryType) +
//       "&page=" +
//       current_page
//   );
//   list = [];
//   console.log(res);

//   const { content, totalPages } = await res.json();

//   for (let i = 0; i < content.length; i++) {
//     await list.push(createCardHistory(content[i]));
//   }
//   SetupPagination(list, pagination_element, totalPages, categoryType);
//   for (let i = 0; i < list.length; i++) {
//     historyContent.appendChild(list[i]);
//   }
// }

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
  current_page = 0
  current_start_index = 0
  displayCards(true);
}

const openNav = () => {
  const subNav = document.querySelector("#sideNav");
  subNav.style.width === ""
    ? (subNav.style.width = "60%")
    : (subNav.style.width = "");
  const input = document.querySelector(".search-bar");
  input.nodeValue = "";
};


displayCards(true);
checkPrev();
checkNext();