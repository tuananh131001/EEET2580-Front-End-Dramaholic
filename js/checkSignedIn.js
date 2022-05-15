let isLogin = JSON.parse(localStorage.getItem("isLogin"));
let isLoginTemp = JSON.parse(sessionStorage.getItem("isLogin"));
const signInButton = document.querySelector(".sign-in-nagivation");
const navRight = document.querySelector(".nav-right");
const accountWrapper = document.querySelector(".account-wrapper");
const dropDown = document.querySelector(".drop-down");
const signInSubbar = document.querySelector(".sign-in-subBar");
const accountMenu = document.querySelector(".account-menu");
function removeSignIn() {
  // media query to check
  var media_query = "screen and (min-width:320px) and (max-width:1023px)";
  // matched or not
  var matched = window.matchMedia(media_query).matches;
  if (isLogin || isLoginTemp) {
    signInButton.classList.add("hidden");
    signInSubbar.style.display = "none";
    accountMenu.style.display = "flex";
  }
  if (!matched && (isLogin || isLoginTemp)) {
    accountWrapper.style.display = "flex";
  }

  // Not Login
}
function openDropList() {
  accountWrapper.onclick = function () {
    !dropDown.classList.contains("hidden")
      ? dropDown.classList.add("hidden")
      : dropDown.classList.remove("hidden");
  };
}

function handleSignOut() {
  localStorage.removeItem("UserID");
  localStorage.removeItem("isLogin");
  localStorage.removeItem("isAdmin");
  location.reload();
}
if (isLogin || isLoginTemp) {
  removeSignIn();
  openDropList();
  let userid = 0;
  if (isLogin) {
    userid = localStorage.getItem("UserID");
  } else {
    userid = sessionStorage.getItem("UserID");
  }
  fetch("https://dramaholic.herokuapp.com/api/customers/" + userid)
    .then((res) => res.json())
    .then(({ username , admin }) => {
      const accountName = document.querySelectorAll(
        ".navigation-menu-profile-name"
      );
      const adminElement = document.querySelectorAll('.admin')
      console.log(admin)
      adminElement.forEach(element => {
        admin ? element.style.display = 'flex' : element.style.display = 'none'
      })
      admin ? localStorage.setItem("isAdmin",true): localStorage.setItem("isAdmin",false)
      accountName.forEach((name) => (name.innerHTML = username.toUpperCase()));
    });
}
