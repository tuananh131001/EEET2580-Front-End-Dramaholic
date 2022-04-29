const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");
const select_box = document.getElementById("cars");
const district_choose = document.querySelector("#district");
const filter_button = document.querySelectorAll(".filter");
const langSelect = document.querySelector("#lang");
const searchdDistrict = document.querySelector(".searchDistrict");
const searchName = document.querySelector(".searchName");

function getPark() {
  fetch("https://api.data.gov.hk/v1/carpark-info-vacancy")
    .then((respone) => respone.json())
    .then((data) => {
      let { results } = data;

      // select discrict
      if (district_choose.value != "none") {
        results = results.filter(function (el) {
          return el.district == district_choose.value;
        });
      }

      // select carpark name
      if (select_box.value != "none") {
        results = results.filter(function (el) {
          return el.carpark_Type == select_box.value;
        });
      }
      // select language
      if (langSelect.value != "none") {
        results = results.filter(function (el) {
          return el.lang == langSelect.value;
        });
      }

      // Search address
      if (searchdDistrict.value != "") {
        results.forEach((address) => {
          const isVisible = address.displayAddress.includes(
            searchdDistrict.value
          );
          if (isVisible) {
            results = results.filter(function (el) {
              return el.displayAddress.includes(searchdDistrict.value);
            });
          }
        });
      }
      // Search Name
      if (searchName.value != "") {
        results.forEach((name) => {
          const isVisible = name.name.includes(searchName.value);
          if (isVisible) {
            results = results.filter(function (el) {
              return el.name.includes(searchName.value);
            });
          }
        });
      }
      DisplayList(results, list_element, rows, current_page);
      SetupPagination(results, pagination_element, rows);
    });
}

getPark();

let current_page = 1;
let rows = 10;

function DisplayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let id = paginatedItems[i].park_Id;
    let name = paginatedItems[i].name;
    let district = paginatedItems[i].district;
    let displayAddress = paginatedItems[i].displayAddress;
    let latitude = paginatedItems[i].latitude;
    let longitude = paginatedItems[i].longitude;
    let carpark_Type = paginatedItems[i].carpark_Type;
    let parkPhoto =
      paginatedItems[i].renditionUrls?.carpark_photo === undefined
        ? "https://dauthau.asia/themes/dauthau/images/businesslistings/noimages.png"
        : paginatedItems[i].renditionUrls.carpark_photo;
    let opening_status = paginatedItems[i].opening_status;
    let lang = paginatedItems[i].lang;

    let item_element = `
    <ul class="item">
        <li>Park ID : ${id}</li>
        <li>Carpark Type : ${carpark_Type}</li>
        <li>Name :${name}</li>
        <li>District: ${district}</li>
        <li>Latitude: ${latitude}</li>
        <li>Longitude: ${longitude}</li>
        <li>Display Address ${displayAddress}</li>
        <li>Language: ${lang}</li>
        <details>
        <summary>More details</summary>
          <div>Park Photo :
          <img class="parkPhoto" src="${parkPhoto}" > </div>
          <li>Opening Status : ${opening_status}</li>
        </details>
    </ul>
    `;
    wrapper.innerHTML += item_element;
  }
}

function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, list_element, rows, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

filter_button.forEach((button) => {
  button.addEventListener("click", () => {
    getPark();
  });
});
