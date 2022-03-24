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
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/11/19/sny500e6_1920x1080-keanhoilo_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2020/12/25/izk8e6is_1920x1080-riddickthonglinhbongtoi_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/12/02/7uywy9bh_1920x1080-hoden_296_168.webp",
  },
  {
    id: 2,
    image:
      "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2021/03/17/z4pqgeck_1920x1080-thuanhuyet7_296_168.webp",
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
// let filmClassstart =
//   '<div class="swiper-slide"><a class="thumbTile" href="#"><img class="thumbTile__image" src="';
// let filmClassend = '" alt="Suits"></a></div>';
let filmClassstart =
  '<div class="swiper-slide"><img class="thumbTile__image" src="';
let filmClassend = '"></div>';

filmList1.forEach(
  (film) =>
    (filmContainer1.innerHTML += filmClassstart + film.image + filmClassend)
);
filmList2.forEach(
  (film) =>
    (filmContainer2.innerHTML += filmClassstart + film.image + filmClassend)
);
// End Swipe
const swiper = new Swiper(".swiper", {
  // Optional parameters
  spaceBetween: 5,
  slidesPerView: 2,
  loop: true,
  freeMode: true,
  loopAdditionalSlides: 5,
  speed: 500,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      freeMode: false,
    },
  },
});
