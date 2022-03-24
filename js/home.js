const filmContainer1 = document.querySelector(".korean");
const filmContainer2 = document.querySelector(".trending");

const filmList1 = [
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
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/07/27/v0k12byv_1920x1080-chaytron2020_296_168.webp",
  },
];
const filmList2 = [
  {
    id: 1,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/27/6aiiawke_1920x1080_conangxinhdep_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/01/07/vdex07ka_horizontal-thumbnail-nuaduongmat0e1832ec2d83da051e1cc4e2c0f9d367_296_168.webp",
  },
];
let filmClass = "<div class=" + "movie-poster" + ">";
filmList1.forEach(
  (film) =>
    (filmContainer1.innerHTML +=
      filmClass + "<img src=" + film.image + ">" + "</div>")
);
filmList2.forEach(
  (film) =>
    (filmContainer2.innerHTML +=
      filmClass + "<img src=" + film.image + ">" + "</div>")
);
