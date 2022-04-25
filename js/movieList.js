const movieListArray = [];

const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 20;

list_element.innerHTML = "";
fetch("https://dramaholic.herokuapp.com/api/movies")
  .then((respone) => respone.json())
  .then((data) => {
    let page_count = data.totalPages;
    for (let i = 1; i < page_count; i++) {
      let btn = PaginationButton(i, data.content);
      pagination_element.appendChild(btn);
    }
    DisplayList(data.content, list_element);
  });
function createDivMovie(x) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("movie-wrapper")
  
  let title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = x.title;

  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper")

  let editButton = document.createElement("button");
  editButton.classList.add("edit-button")
  editButton.innerText = "EDIT"

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button")
  deleteButton.innerText = "DELETE"

  wrapper.appendChild(title);
  wrapper.appendChild(buttonWrapper)
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
function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");
  button.addEventListener("click", function () {
    current_page = page;
    fetch("https://dramaholic.herokuapp.com/api/movies?page=" + current_page)
      .then((respone) => respone.json())
      .then(({ content }) => {
        items = [];
        for (let i = 0; i < content.length; i++) {
          items.push(content[i]);
        }
        DisplayList(items, list_element);
      });
    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}
