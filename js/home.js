const filmContainer = document.querySelector(".movie-row");

const filmList = [
  {
    id: 1,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2022/02/16/j8nmp6qd_1920x1080-killheel_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
];
let filmClass = "<div class=" + "movie-poster" + ">";
filmList.forEach(
  (film) => (filmContainer.innerHTML += filmClass +"<img src=" + film.image + ">" + "</div>")
);
