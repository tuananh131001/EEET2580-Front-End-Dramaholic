const closeVideo = document.querySelector(".close-video");
let originalURL = "https://dramaholic.herokuapp.com/api/movies/";

let id = new URLSearchParams(location.search).get('dbid');
let userId = JSON.parse(localStorage.getItem("UserID"));
console.log(id);
let film_title = "";
let film_youtube = "";
var fetchingURL = originalURL + id;
var fetchingURL_watch_later =
  "https://dramaholic.herokuapp.com/api/customers/" + userId + "/watchLater";

//check water_later list
if (userId != null) {
  fetch(fetchingURL_watch_later)
    .then((response) => response.json())
    .then((json) => {
      //comments section get
      // const movies = json.movies;
      let array_watch_later = [];
      array_watch_later = json._embedded.movies;
      console.log(array_watch_later);
      console.log(array_watch_later[0]._links.movie.href);

      for (let i = 0; i < array_watch_later.length; i++) {
        if (fetchingURL == array_watch_later[i]._links.movie.href) {
          document.querySelector("#button_watch_later").outerHTML = `
          <button id="button_watch_later" class="button btn2" onclick="delete_watch_later()">
              REMOVE FROM LIST
            </button>`;
          break;
        }
      }
    });
}

fetch(fetchingURL)
  .then((response) => response.json())
  .then((json) => {
    //comments section get
    getInfomationMovie();
    //parse year
    let text = json.date;
    const json_year = text.split("-");
    let year = json_year[0];
    let epsiodes = json.episodes;
    //
    film_title = json.title;
    let href_cut = json.href.split("https://www.youtube.com/watch?v=");
    film_youtube =
      "https://www.youtube.com/embed/" + href_cut[1] + "?enablejsapi=1";

    document.querySelector(
      ".thumbnail_portrait"
    ).innerHTML = `<img src="${json.thumbnail}" alt="">`;
    document.querySelector(".screen").style.background =
      "url(" +
      json.thumbnail_landscape +
      ") center top / cover no-repeat fixed";
    document.querySelector("#movie_title").innerHTML = json.title;
    document.querySelector("#movie_star").innerHTML = `${json.rating}/10`;
    for (let i = 0; i < json.genres.length; i++) {
      if (i == 0) {
        document.querySelector("#movie_genre").innerHTML += `${json.genres[i]}`;
      } else {
        document.querySelector(
          "#movie_genre"
        ).innerHTML += ` & ${json.genres[i]}`;
      }
    }
    document.querySelector("#movie_description").innerHTML = json.description;
    try {
      document.querySelector(
        `#star${parseInt(json.rating)}`
      ).outerHTML = `<input type="radio" id="star${parseInt(
        json.rating
      )}" checked>`;
    } catch (err) {
      console.log("Perfect 10/10");
    }

    for (let i = 0; i < json.actors.length; i++) {
      document.querySelector(".scroll-images").innerHTML += `<div class="child">

                      <img class="child-img" src="${json.actors[i].image}" alt="image">
                      <div class="cast_name">${json.actors[i].name} </br> <p>${json.actors[i].character} </p></div>
                  </div>`;
    }
    //nation name
    const regionNames = new Intl.DisplayNames(["en"], {
      type: "language",
    });

    let country = regionNames.of(json.country.toUpperCase());



    // Movie Information
    document.querySelector(
      "#movie_director"
    ).innerHTML += `<h2 class="director_name ">Genres:<h3 class="info_text"> ${json.genres}</h3></h2>`;
    
    // Director 
    for (let i = 0; i < json.director.length; i++) {
      document.querySelector(
        "#movie_director"
      ).innerHTML += `<h2 class="director_name">Director: </h2><h3 class="info_text">${json.director[i]}</h3>`;
    }
    document.querySelector(
      "#movie_director"
    ).innerHTML += `<h2 class="director_name ">Episodes: </h2><h3 class="info_text">${epsiodes}</h3>`;
    document.querySelector(
      "#movie_director"
    ).innerHTML += `<h2 class="director_name ">Language:<h3 class="info_text"> ${country}</h3></h2>`;
    document.querySelector(
      "#movie_director"
    ).innerHTML += `<h2 class="director_name ">Original Title:<h3 class="info_text"> ${json.originalTitle}</h3></h2>`;
    document.querySelector(
      "#movie_director"
    ).innerHTML += `<h2 class="director_name ">Year Released: </h2><h3 class="info_text">${year}</h3>`;

    document.querySelector(
      "#youtube_frame"
    ).innerHTML = `<iframe id = "iframe_frame" class="youtube" src="${film_youtube}" title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;

    document.querySelector("#youtube_frame").width = "100px";
  });
function handleDelteComment(commentId, username, password) {
  const dataToSend = JSON.stringify({
    username: username,
    password: password,
  });
  fetch("https://dramaholic.herokuapp.com/api/comments/" + commentId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: dataToSend,
  }).then((response) => {
    getInfomationMovie();
  });
}
async function getInfomationMovie() {
  const id =  new URLSearchParams(location.search).get('dbid');
  const url = await fetch("https://dramaholic.herokuapp.com/api/movies/" + id);
  const json = await url.json();
  getComments(json.comments);
}
function handleUpvote(commentId, username, password) {
  const dataToSend = JSON.stringify({
    username: username,
    password: password,
  });
  fetch(
    "https://dramaholic.herokuapp.com/api/comments/" + commentId + "/vote",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dataToSend,
    }
  ).then((response) => {
    getInfomationMovie();
  });
}
function sortComments(commentList) {
  commentList.sort((a, b) => parseInt(b.upvotes) - parseInt(a.upvotes));
  return commentList;
}

function getComments(commentList) {
  commentList = sortComments(commentList);
  let userID = JSON.parse(localStorage.getItem("UserID"));
  const commentListElement = document.querySelector(".comment-list");
  commentListElement.innerHTML = "";
  commentList.forEach(({ id, message, user, upvotes, upvoters }) => {
    //Init
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const topElement = document.createElement("div");
    topElement.className = "top-comment-section";
    const messageElement = document.createElement("h2");
    messageElement.textContent = message;
    messageElement.className = "message";
    const userElement = document.createElement("h3");
    userElement.textContent = "By: " + user.name;
    userElement.className = "user-name";

    // Vote section
    const voteContainer = document.createElement("div");
    voteContainer.className = "vote-container";
    const voteElement = document.createElement("h3");
    voteElement.textContent = upvotes;
    voteElement.className = "upvote";
    voteContainer.appendChild(voteElement);

    const authorWrapper = document.createElement("div");
    authorWrapper.className = "author-wrapper";

    // Add Section
    authorWrapper.appendChild(voteContainer);
    topElement.appendChild(messageElement);
    authorWrapper.appendChild(userElement);
    wrapper.appendChild(topElement);
    wrapper.appendChild(authorWrapper);
    const isAdmin = localStorage.getItem("isAdmin");

    if (user.id == userID || isAdmin == "true") {
      const deleteButton = document.createElement("i");
      deleteButton.className = "fa-solid fa-trash delete";
      deleteButton.addEventListener("click", (e) => {
        handleDelteComment(id, user.username, user.password);
        console.log(id);
      });
      topElement.appendChild(deleteButton);
    }
    // Upvote button
    const upvoteButton = document.createElement("i");
    console.log(upvoters);
    upvoters.find((upvoter) => upvoter.id === userID)
      ? (upvoteButton.style.color = "red")
      : (upvoteButton.style.color = "white");
    upvoteButton.className = "fa-solid fa-thumbs-up vote";
    upvoteButton.addEventListener("click", (e) => {
      let originalURL = "https://dramaholic.herokuapp.com/api/customers/";
      let userID = JSON.parse(localStorage.getItem("UserID"));
      fetch(originalURL + userID)
        .then((response) => response.json())
        .then((json) => {
          handleUpvote(id, json.username, json.password);
        });
    });
    voteContainer.appendChild(upvoteButton);

    commentListElement.appendChild(wrapper);
  });
}
const form = document.forms["comment-section"];
form.addEventListener("submit", handleSubmitComment);
function handleSubmitComment(e) {
  e.preventDefault();
  let originalURL = "https://dramaholic.herokuapp.com/api/customers/";
  let userID = JSON.parse(localStorage.getItem("UserID"));
  fetch(originalURL + userID)
    .then((response) => response.json())
    .then((json) => {
      let messageMovie = document.forms["comment-section"]["message"].value;
      messageMovie == "" ? location.reload() : null;
      let movieID =  new URLSearchParams(location.search).get('dbid').toString();
      const dataToSend = JSON.stringify({
        message: messageMovie,
        user: {
          username: json.username,
          password: json.password,
        },
        movie: { dbID: movieID },
      });
      fetch("https://dramaholic.herokuapp.com/api/comments", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: dataToSend,
      }).then((response) => {
        fetch("https://dramaholic.herokuapp.com/api/movies/" + movieID)
          .then((response) => response.json())
          .then((json) => {
            getInfomationMovie();
            document.forms["comment-section"]["message"].value = "";
          });
      });
    });
}

function play_movie() {
  document.getElementById("youtube_frame").style.visibility = "visible";
  closeVideo.style.display = "block";
  document.getElementById("youtube_frame").style.animationName = "zoom-in";
  document.getElementById("youtube_frame").style.animationDuration = "1s";
  document.getElementById("full-screen").style.visibility = "visible";
  // fix no youtube
  document.querySelector("#blur_frame").style.position = "absolute";
  add_history();
}
function stop_movie() {
  if (document.getElementById("youtube_frame").style.visibility == "visible") {
    // media query to check
    var media_query = "screen and (min-width:320px) and (max-width:1023px)";
    // matched or not
    var matched = window.matchMedia(media_query).matches;
    // fix no youtube
    matched
      ? (document.querySelector("#blur_frame").style.position = "revert")
      : (document.querySelector("#blur_frame").style.position = "absolute");
    var frame = document.getElementById("iframe_frame");
    frame.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
    closeVideo.style.display = "none";
    document.getElementById("youtube_frame").style.animationName = "zoom-out";
    document.getElementById("youtube_frame").style.visibility = "collapse";
    document.getElementById("full-screen").style.visibility = "collapse";
  }
}
// Watch Later
function add_history() {
  let originalURL = "https://dramaholic.herokuapp.com/api/customers/";
  let userID = JSON.parse(localStorage.getItem("UserID"));
  let movieID =  new URLSearchParams(location.search).get('dbid');
  var fetchingURL = originalURL + userID;

  if (userID == null) {
  } else {
    fetch(fetchingURL)
      .then((response) => response.json())
      .then((json) => {
        const dataToSend = JSON.stringify({
          username: json.username,
          password: json.password,
          dbID: movieID,
        });
        fetch("https://dramaholic.herokuapp.com/api/customers/history", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: dataToSend,
        }).then((response) => {
          console.log(response);
        });
      });
  }
}
function add_watch_later() {
  let originalURL = "https://dramaholic.herokuapp.com/api/customers/";
  let userID = JSON.parse(localStorage.getItem("UserID"));
  let movieID =  new URLSearchParams(location.search).get('dbid');;
  var fetchingURL = originalURL + userID;

  if (userID == null) {
    window.location.href = "../user/login.html";
  } else {
    fetch(fetchingURL)
      .then((response) => response.json())
      .then((json) => {
        const dataToSend = JSON.stringify({
          username: json.username,
          password: json.password,
          dbID: movieID,
        });
        fetch("https://dramaholic.herokuapp.com/api/customers/watchlater", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: dataToSend,
        }).then((response) => {
          console.log(response);
        });
      });
    document.querySelector("#button_watch_later").outerHTML = `
              <button id="button_watch_later" class="button btn2" onclick="delete_watch_later()">
                  REMOVE FROM LIST
                </button>`;
  }
}
function delete_watch_later() {
  let originalURL = "https://dramaholic.herokuapp.com/api/customers/";
  let userID = JSON.parse(localStorage.getItem("UserID"));
  let movieID =  new URLSearchParams(location.search).get('dbid');
  var fetchingURL = originalURL + userID;

  if (userID == null) {
  } else {
    fetch(fetchingURL)
      .then((response) => response.json())
      .then((json) => {
        const dataToSend = JSON.stringify({
          username: json.username,
          password: json.password,
          dbID: movieID,
        });
        fetch("https://dramaholic.herokuapp.com/api/customers/watchlater", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: dataToSend,
        }).then((response) => {
          console.log(response);
        });
      });
    document.querySelector("#button_watch_later").outerHTML = `
          <button id="button_watch_later" class="button btn2" onclick="add_watch_later()">
              WATCH LATER
            </button>`;
  }
}
var tag = document.createElement("script");
tag.scr = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYoutubeIframeAPIReady() {
  player = new YT.Player("player", {
    events: {
      onReady: onPlayerReady,
      onStateReady: onPlayerStateChange,
    },
  });
}
function scrolll() {
  var left = document.querySelector(".scroll-images");
  left.scrollBy(-85, 0);
}

function scrollr() {
  var right = document.querySelector(".scroll-images");
  right.scrollBy(85, 0);
}
function onPlayerReady(e) {
  e.target.playVideo();
}
function onPlayerStateChange(e) {
  console.log("player state changed");
}
// <!-- Responsive star and rating -->

const responsive_rating = document.querySelector(".star");
const responsive_star = document.querySelector("#movie_radio");
function responsiveRating() {
  if (window.innerWidth < 923) {
    responsive_star.style.visibility = "collapse";
    responsive_rating.style.marginLeft = "0";
    responsive_star.style.width = "0";
  } else if (window.innerWidth >= 923) {
    responsive_star.style.visibility = "visible";
    responsive_rating.style.marginLeft = "2%";
    responsive_star.style.width = "130px";
  }
}

window.onresize = responsiveRating;

// ------------------------------------- Header


const openNav = () => {
  const subNav = document.querySelector("#sideNav");
  subNav.style.width === ""
    ? (subNav.style.width = "60%")
    : (subNav.style.width = "");
};
