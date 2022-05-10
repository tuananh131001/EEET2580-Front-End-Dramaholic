let user = localStorage.getItem("UserID")
if (user == "" || user == null) {
    window.location.replace("../../index.html");
}
else {
// let current_user = sessionStorage.getItem('UserID')
fetch(`https://dramaholic.herokuapp.com/api/customers/${user}`)
.then((response) => response.json())
.then((user) => {
    let insertname = document.querySelectorAll(".navigation-menu-profile-name")
    for (let i=0; i<insertname.length; i++) {
        insertname[i].innerHTML = "Hi, " + user.username.toUpperCase()
    }
        
    if (user.admin == true) {
        let a = document.querySelectorAll(".admin-dashboard")
        for (let i=0; i<a.length; i++) {
            a[i].removeAttribute("hidden")
        }
    }
})
.catch((error) => {
    console.log(error); 
});
}

const historyContent = document.querySelector(".movie-list-grid");
const pagination_element = document.getElementById("pagination");

const account_navi = document.querySelector(".account-wrapper");
// const prev_btn = document.querySelector("#prev");
// const next_btn = document.querySelector("#next");
// let current_page = 0;
// let rows = 20;
// let pagi_range = 8
// let current_start_index = 0

account_navi.onclick = () => {
  let check = document.querySelector(".drop-down.hidden")
  if (check != null)
    document.querySelector(".drop-down").classList.remove("hidden")
  else
    document.querySelector(".drop-down").classList.add("hidden")
}


const createCardHistory = (x) => {

  let card = document.createElement("div");
  card.className = "movie-search-card";
  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image";
  img.src = movies.thumbnail;

  card.appendChild(img);

  var cardContent = document.createElement("div");
  cardContent.className = "card-content";
  card.appendChild(cardContent);

  // Title
  let title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = movies.title;

  cardContent.appendChild(title);

  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = movies.originalTitle;
  cardContent.appendChild(description);
  fetch(movies._links.self.href)
    .then((res) => res.json())
    .then((x) => {
      img.onclick = function () {
        localStorage.setItem("dbid", x.dbID);
        location.href = "/pages/movie/movie_detail.html";
      };
      title.onclick = function () {
        localStorage.setItem("dbid", x.dbID);
        location.href = "/pages/movie/movie_detail.html";
      };
    });
  return card;
};
const userID = localStorage.getItem("UserID");
async function getMovieListSearch(list) {
  const url = await fetch(
    "https://dramaholic.herokuapp.com/api/customers/" + userID + "/history"
  );
  const { _embedded } = await url.json();
  const { movies } = await _embedded;
  for (let i = movies.length -1 ; i >= 0; i--) {
    await list.push(createCardHistory(movies[i]));
  }
  for (let i = 0 ; i < movies.length; i++) {
    await historyContent.appendChild(list[i]);
  }
}

const movieList = [];
getMovieListSearch(movieList);
