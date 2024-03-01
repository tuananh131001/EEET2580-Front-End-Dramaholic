const movieListArray = [];
let pagi_range = 8;
const pagi_region = document.querySelector(".pnormal");
const pagi_region_search = document.querySelector(".psearch");

const list_element = document.querySelector(".pnormal .list");
const pagination_element = document.querySelector(".pnormal .pagenumbers");
const prev_btn = document.querySelector(".pnormal .prev");
const next_btn = document.querySelector(".pnormal .next");
let current_page = 0;
let current_start_index = 0;
let total_pages = 0;


const list_element_search = document.querySelector(".psearch #list");
const pagination_element_search = document.querySelector(
  ".psearch .pagenumbers"
);
const prev_btn_search = document.querySelector(".psearch .prev");
const next_btn_search = document.querySelector(".psearch .next");
const search = document.querySelector(".search");
let current_page_search = 0;
let current_start_index_search = 0;
let current_search = "";
let total_pages_search = 0;

function reloadDatabase() {
  let text = "Are you sure you want to reload database? \nEither OK or Cancel.";
  if (confirm(text) == true) {
    alert("Database is reloading. Please dont press refresh button too soon");
    fetch(
      "https://articulate-bot-415803.as.r.appspot.com/api/movies/loadDatabase?ko=50&g=50&ja=50",
      {
        method: "POST",
      }
    ).then((response) => alert("Database reloaded"));
  }
}

async function getTotalPages(mode) {
  if (mode == "search") {
    let res = await fetch( `https://articulate-bot-415803.as.r.appspot.com/api/movies/search?title=` +current_search)
    const {totalPages} = await res.json()
    total_pages_search = totalPages
  } else {
    let res = await fetch("https://articulate-bot-415803.as.r.appspot.com/api/movies")
    const {totalPages} = await res.json()
    total_pages = totalPages
  }
}

function checkPrev(mode) {
  if (mode == "search") {
    if (current_start_index_search == 0) {
      prev_btn_search.setAttribute("hidden", true);
    } else prev_btn_search.removeAttribute("hidden");
  } else {
    if (current_start_index == 0) {
      prev_btn.setAttribute("hidden", true);
    } else prev_btn.removeAttribute("hidden");
  }
}

function checkNext(mode) {
  if (mode == "search") {
        if (current_start_index_search + pagi_range >= total_pages_search)
          next_btn_search.setAttribute("hidden", true);
        else next_btn_search.removeAttribute("hidden");
  } else {
        if (current_start_index + pagi_range >= total_pages)
          next_btn.setAttribute("hidden", true);
        else next_btn.removeAttribute("hidden");
  }
}


// function checkNext(mode) {
//   if (mode == "search") {
//     fetch(
//       `https://articulate-bot-415803.as.r.appspot.com/api/movies/search?title=` +
//         current_search
//     )
//       .then((respone) => respone.json())
//       .then((data) => {
//         if (current_start_index_search + pagi_range > data.totalPages)
//           next_btn_search.setAttribute("hidden", true);
//         else next_btn_search.removeAttribute("hidden");
//       });
//   } else {
//     fetch("https://articulate-bot-415803.as.r.appspot.com/api/movies")
//       .then((respone) => respone.json())
//       .then((data) => {
//         if (current_start_index + pagi_range > data.totalPages)
//           next_btn.setAttribute("hidden", true);
//         else next_btn.removeAttribute("hidden");
//       });
//   }
// }

prev_btn.onclick = () => {
  current_start_index -= pagi_range;
  checkPrev("normal");
  next_btn.removeAttribute("hidden");
  pagination_element.innerHTML = "";
  for (let i = current_start_index; i < current_start_index + pagi_range; i++) {
    let btn = PaginationButtonNormal(i);
    pagination_element.appendChild(btn);
  }
};

prev_btn_search.onclick = () => {
  current_start_index_search -= pagi_range;
  checkPrev("search");
  next_btn_search.removeAttribute("hidden");
  pagination_element_search.innerHTML = "";
  for (
    let i = current_start_index_search;
    i < current_start_index_search + pagi_range;
    i++
  ) {
    let btn = PaginationButtonSearch(i);
    pagination_element_search.appendChild(btn);
  }
};

next_btn.onclick = () => {
  current_start_index += pagi_range;
  let end_index =
    current_start_index + pagi_range >= total_pages
      ? total_pages
      : current_start_index + pagi_range;
  SetupPagination("normal", end_index);
};

next_btn_search.onclick = () => {
  current_start_index_search += pagi_range;
  let end_index =
    current_start_index_search + pagi_range >= total_pages
      ? total_pages
      : current_start_index_search + pagi_range;
  SetupPagination("search", end_index);
};

function PaginationButtonNormal(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page + 1;
  if (current_page == page) button.classList.add("active");
  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pnormal button.active");
    if (prev_active != null) prev_active.classList.remove("active");
    current_page = button.innerText - 1;
    getMovieList("normal", false);
    button.classList.add("active");
  });
  return button;
}

function PaginationButtonSearch(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page + 1;
  if (current_page_search == page) button.classList.add("active");
  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".psearch button.active");
    if (prev_active != null) prev_active.classList.remove("active");
    current_page_search = button.innerText - 1;
    getMovieList("search", false);
    button.classList.add("active");
  });
  return button;
}

function SetupPagination(mode, end_index) {
  checkPrev(mode);
  checkNext(mode);
  let wrapper =
    mode == "search" ? pagination_element_search : pagination_element;
  let index =
    mode == "search" ? current_start_index_search : current_start_index;
  wrapper.innerHTML = "";
  for (let i = index; i < end_index; i++) {
    let btn =
      mode == "search" ? PaginationButtonSearch(i) : PaginationButtonNormal(i);
    wrapper.appendChild(btn);
  }
}

async function getMovieList(mode, isNew) {
  let url =
    mode == "search"
      ? `https://articulate-bot-415803.as.r.appspot.com/api/movies/search?title=${current_search}&page=${current_page_search}`
      : `https://articulate-bot-415803.as.r.appspot.com/api/movies?page=${current_page}`;
  const res = await fetch(url);
  const { content, totalPages } = await res.json();

  let list = [];
  for (let i = 0; i < content.length; i++) {
    await list.push(content[i]);
  }

  let wrapper = mode == "search" ? list_element_search : list_element;
  DisplayList(list, wrapper);

  let start_index =
    mode == "search" ? current_start_index_search : current_start_index;

  if (isNew) {
    if (mode == "search") total_pages_search = totalPages
    else total_pages = totalPages
    // getTotalPages(mode)
    let end_index =
      start_index + pagi_range >= totalPages
        ? totalPages
        : start_index + pagi_range;
    SetupPagination(mode, end_index);
  }
}

// function displayMovieList(isNew) {
//   list_element.innerHTML = "";
//   fetch("https://articulate-bot-415803.as.r.appspot.com/api/movies?page=" + current_page)
//     .then((respone) => respone.json())
//     .then(({ content }) => {
//       items = [];
//       for (let i = 0; i < content.length; i++) {
//         items.push(content[i]);
//       }
//       DisplayList(items, list_element);
//       if (isNew) SetupPagination('normal',)
//     });
// }

function DisplayList(items, wrapper) {
  wrapper.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    let d = document.createElement("div");
    d = createDivMovie(items[i]);
    wrapper.appendChild(d);
  }
}

function createDivMovie(x) {
  let wrapper = document.createElement("div");

  wrapper.classList.add("movie-wrapper");

  let title = document.createElement("div");
  title.className = "card-title";
  title.textContent = x.title;

  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");

  let editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.classList.add("white_theme_button");
  editButton.innerHTML = `<i class="fa-regular fa-edit" ></i>`;
  editButton.onclick = function () {
    location.href = "./edit-movie.html?dbid=" + x.dbID;
  };

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("white_theme_button");
  deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

  deleteButton.onclick = async () => {
    let text = `Are you sure to delete movie "${x.title}"?`;

    if (confirm(text) == true) {
      const response = await fetch(
        "https://articulate-bot-415803.as.r.appspot.com/api/movies/" + x.dbID,
        {
          method: "DELETE",
        }
      );
      alert(`Successfully deleted "${x.title}"`);
      if (current_search) {
        getMovieList("search", false);
      } else getMovieList("normal", false);
    }
  };

  wrapper.appendChild(title);

  wrapper.appendChild(buttonWrapper);
  buttonWrapper.appendChild(editButton);
  buttonWrapper.appendChild(deleteButton);
  return wrapper;
}

// // Search Function
// async function getMovieListSearch(title) {
//   const url = await fetch(
//     "https://articulate-bot-415803.as.r.appspot.com/api/movies/search?title=" + title
//   );
//   const { content } = await url.json();
//   list_element_search.innerHTML = "";
//   list = [];
//   for (let i = 0; i < content.length; i++) {
//     list.push(content[i]);
//   }
//   DisplayList(list, list_element_search);
// }

// async function getMovieListSearch(isNew) {
//   const url = await fetch(
//     "https://articulate-bot-415803.as.r.appspot.com/api/movies/search?title=" +
//       current_search +
//       "&page=" +
//       current_page_search
//   );
//   const { content, totalPages } = await url.json();

//   let list = [];
//   for (let i = 0; i < content.length; i++) {
//     await list.push(createCardSearch(content[i]));
//   }

//   DisplayList(list, list_element_search)

//   if (isNew) {
//     let end_index = (current_start_index_search + pagi_range) > totalPages ? totalPages : (current_start_index_search + pagi_range)
//     SetupPagination("search", end_index)
//   }
// }

search.addEventListener("input", (e) => {
  current_search = e.target.value;
  if (current_search) {
    current_page_search = 0;
    current_start_index_search = 0;
    pagi_region.classList.add("hidden");
    getMovieList("search", true);
    pagi_region_search.classList.remove("hidden");
  } else {
    pagi_region_search.classList.add("hidden");
    pagi_region.classList.remove("hidden");
  }
});

getMovieList("normal", true);
