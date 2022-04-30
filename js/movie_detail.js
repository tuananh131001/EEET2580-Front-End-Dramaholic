const closeVideo = document.querySelector(".close-video");
let originalURL = "https://dramaholic.herokuapp.com/api/movies/";

let id = JSON.parse(localStorage.getItem("dbid"));
let film_title = "";
let film_youtube = "";
var fetchingURL = originalURL + id;

fetch(fetchingURL)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    //parse year
    let text = json.date;
    const json_year = text.split("-");
    let year = json_year[0];
    //
    film_title = json.title;
    let href_cut = json.href.split("https://www.youtube.com/watch?v=");
    film_youtube =
      "https://www.youtube.com/embed/" + href_cut[1] + "?enablejsapi=1";
    console.log(film_youtube);
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
        document.querySelector("#movie_info").innerHTML += `${json.genres[i]}`;
      } else {
        document.querySelector(
          "#movie_info"
        ).innerHTML += ` & ${json.genres[i]}`;
      }
    }
    document.querySelector("#movie_description").innerHTML = json.description;
    document.querySelector(
      `#star${parseInt(json.rating)}`
    ).outerHTML = `<input type="radio" id="star${parseInt(
      json.rating
    )}" checked>`;
    for (let i = 0; i < json.actors.length; i++) {
      document.querySelector(".scroll-images").innerHTML += `<div class="child">

                      <img class="child-img" src="${json.actors[i].image}" alt="image">
                      <div class="cast_name">${json.actors[i].name}</div>
                  </div>`;
    }
    for (let i = 0; i < json.director.length; i++) {
      document.querySelector(
        "#movie_director"
      ).innerHTML += `<div class="director_name">${json.director[i]}</div>`;
    }

    //nation name
    const regionNames = new Intl.DisplayNames(["en"], {
      type: "language",
    });
    let country = regionNames.of(json.country.toUpperCase());
    document.querySelector(
      "#movie_info"
    ).innerHTML += ` . ${year} . ${country}`;

    document.querySelector(
      "#youtube_frame"
    ).innerHTML = `<iframe id = "iframe_frame" class="youtube" src="${film_youtube}" title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;

  });

function play_movie() {
  document.getElementById("youtube_frame").style.visibility = "visible";
  closeVideo.style.display = "block";
}
function stop_movie() {
  if (document.getElementById("youtube_frame").style.visibility == "visible") {
    var frame = document.getElementById("iframe_frame");
    frame.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
    document.getElementById("youtube_frame").style.visibility = "collapse";
    closeVideo.style.display = "none";
  }
}
// Watch Later

function add_watch_later() {
  let originalURL = "https://dramaholic.herokuapp.com/api/customers/";
  let userID = JSON.parse(localStorage.getItem("UserID"));
  let movieID = JSON.parse(localStorage.getItem("dbid"));
  var fetchingURL = originalURL + userID;

  if (userID == null) {
    alert("Please sign in or sign up to add movie to watch later");
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
  if (window.outerWidth <= 375) {
    responsive_star.style.visibility = "collapse";
    responsive_rating.style.marginLeft = "0";
    responsive_star.style.width = "0";
  } else if (window.outerWidth < 780) {
    responsive_star.style.visibility = "collapse";
    responsive_rating.style.marginLeft = "0";
    responsive_star.style.width = "0";
  } else if (window.outerWidth >= 780) {
    responsive_star.style.visibility = "visible";
    responsive_rating.style.marginLeft = "2%";
    responsive_star.style.width = "130px";
  }
}

window.onresize = responsiveRating;
