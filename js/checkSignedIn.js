let isLogin = JSON.parse(localStorage.getItem("isLogin"));
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
  if (isLogin) {
    signInButton.classList.add("hidden");
    signInSubbar.style.display = "none";
    accountMenu.style.display = "flex";
  }
  if (!matched && isLogin) {
    console.log(matched);
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
  localStorage.clear();
  location.reload();
}
if (isLogin) {
  removeSignIn();
  openDropList();
  const userid = localStorage.getItem("UserID");
  fetch("https://dramaholic.herokuapp.com/api/customers/" + userid)
    .then((res) => res.json())
    .then((content) => {
      const accountName = document.querySelectorAll(
        ".navigation-menu-profile-name"
      );
      accountName.forEach(
        (name) => (name.innerHTML = content.username.toUpperCase())
      );
    });
}
