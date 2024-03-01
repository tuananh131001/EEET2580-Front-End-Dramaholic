let user = localStorage.getItem("UserID")
if (user == "" || user == null) {
    window.location.replace("../../index.html");
}
else {
// let current_user = sessionStorage.getItem('UserID')
fetch(`https://articulate-bot-415803.as.r.appspot.com/api/customers/${user}`)
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


const account_navi = document.querySelector(".account-wrapper");

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
const historyContent = document.querySelector(".movie-list-grid");
async function getMovieListHistory() {
  const url = await fetch(
    "https://articulate-bot-415803.as.r.appspot.com/api/customers/" + userID + "/history"
  );
  let list = []
  const { _embedded } = await url.json();
  const { movies } = await _embedded;
  for (let i = movies.length -1 ; i >= 0; i--) {
    await list.push(createCardHistory(movies[i]));
  }
  for (let i = 0 ; i < movies.length; i++) {
    await historyContent.appendChild(list[i]);
  }
}

// const movieList = [];
getMovieListHistory();
