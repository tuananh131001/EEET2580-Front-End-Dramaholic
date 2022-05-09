const movieListArray = [];

const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");
const search = document.querySelector(".search");
const prev_btn = document.querySelector("#prev");
const next_btn = document.querySelector("#next");
let current_page = 1;
let rows = 20;
let pagi_range = 8
let current_start_index = 1

checkPrev()
checkNext()

function checkPrev() {
  if(current_start_index == 1) prev_btn.setAttribute("hidden",true)
  else prev_btn.removeAttribute("hidden")
}

function checkNext() {
  fetch("https://dramaholic.herokuapp.com/api/movies")
  .then((respone) => respone.json())
  .then((data) => {
    console.log(current_start_index+pagi_range, data.totalPages, (current_start_index+pagi_range) > data.totalPages )
    if((current_start_index+pagi_range) > data.totalPages) next_btn.setAttribute("hidden",true)
    else next_btn.removeAttribute("hidden")
  });
}

prev_btn.onclick = () => {
  current_start_index -= pagi_range
  checkPrev()
  checkNext()
  pagination_element.innerHTML = "";
  for (let i = current_start_index; i < current_start_index+pagi_range; i++) {
    let btn = PaginationButton(i);
    pagination_element.appendChild(btn);
  }
}

next_btn.onclick = () => {
  current_start_index += pagi_range
  checkNext()
  checkPrev()
  pagination_element.innerHTML = "";
  for (let i = current_start_index; i < current_start_index+pagi_range; i++) {
    let btn = PaginationButton(i);
    console.log(btn)
    pagination_element.appendChild(btn);
  }
}

function getMovieListAdmin() {
  list_element.innerHTML = "";
  pagination_element.innerHTML = "";
  fetch("https://dramaholic.herokuapp.com/api/movies")
    .then((respone) => respone.json())
    .then((data) => {
      let page_count = data.totalPages;
      let end_index = (current_start_index + pagi_range) > data.totalPages+1 ? data.totalPages+1 : (current_start_index + pagi_range)
      for (let i = current_start_index; i < end_index; i++) {
        let btn = PaginationButton(i);
        pagination_element.appendChild(btn);
      }
      DisplayList(data.content, list_element);
    });
}

function displayMovieList() {
  fetch("https://dramaholic.herokuapp.com/api/movies?page=" + current_page)
    .then((respone) => respone.json())
    .then(({ content }) => {
      items = [];
      for (let i = 0; i < content.length; i++) {
        items.push(content[i]);
      }
      DisplayList(items, list_element);
    });
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
  editButton.innerText = "EDIT";
  editButton.onclick = function () {
    sessionStorage.setItem("edit_dbid", x.dbID);
    location.href = "./edit-movie.html";
  };

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("white_theme_button");
  deleteButton.innerText = "DELETE";
  deleteButton.onclick = async () => {
    let text = `Are you sure to delete movie "${x.title}"?`
    if (confirm(text) == true) {
    const response = await fetch(
      "https://dramaholic.herokuapp.com/api/movies/" + x.dbID,
      {
        method: "DELETE",
      }
    );
    alert(`Successfully deleted "${x.title}"`)
    getMovieListAdmin();
    
    const data = await response.json();

    // now do whatever you want with the data
    console.log(data);
    }
    
    displayMovieList()
  };

  wrapper.appendChild(title);
  wrapper.appendChild(buttonWrapper);
  buttonWrapper.appendChild(editButton);
  buttonWrapper.appendChild(deleteButton);
  return wrapper;
}

function getPage(index, list) {}

function DisplayList(items, wrapper) {
  wrapper.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    wrapper.appendChild(createDivMovie(items[i]));
  }
}

function PaginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");
  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pagenumbers button.active");
    if(prev_active != null) prev_active.classList.remove("active");
    current_page = button.innerText;
    displayMovieList()
    button.classList.add("active");
  });

  return button;
}

// Search Function
async function getMovieListSearch(title, list) {
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" + title
  );
  const { content } = await url.json();
  list_element.innerHTML = "";
  list = [];
  for (let i = 0; i < content.length; i++) {
    list.push(content[i]);
  }
  DisplayList(list, list_element);
}
getMovieListAdmin();
search.addEventListener("input", (e) => {
  let current_search = e.target.value;
  const movieListArray = [];
  if (current_search) {
    pagination_element.innerHTML = "";
    getMovieListSearch(current_search, movieListArray);
  } else {
    getMovieListAdmin();
  }
});
