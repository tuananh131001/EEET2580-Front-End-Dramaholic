let isLogin = JSON.parse(localStorage.getItem("isLogin"));
const signInButton = document.querySelector(".sign-in-nagivation");
const navRight = document.querySelector(".nav-right");
const accountWrapper = document.querySelector(".account-wrapper");
const dropDown = document.querySelector(".drop-down")

function removeSignIn() {
  signInButton.classList.add("hidden");
}
// const accountWrapper = document.createElement("div");
// function createProfileElement() {
//   accountWrapper.classList.add("account-wrapper");
// }
// function createDropDownList(){
//     const dropDown = document.createElement("div");
//     dropDown.classList.add("drop-down")
//     const accountSetting = document.createElement("a")
//     accountSetting.innerText =  "Account"
//     dropDown.appendChild(accountSetting)
//     const signOut = document.createElement("button")
//     signOut.innerText =  "Sign Out"
//     dropDown.appendChild(signOut)
//     accountWrapper.appendChild(dropDown)
//     const avatar = document.createElement("img");
//     avatar.classList.add("avatar")
//     const downArrow = document.createElement("span");
//     downArrow.classList.add("avatar")
//     downArrow.onclick = function () {
//         !dropDown.classList.contains("hidden")?
//         dropDown.classList.add("hidden"):
//         dropDown.classList.remove("hidden")
//       };
//     avatar.onclick = function () {
//         !dropDown.classList.contains("hidden")?
//         dropDown.classList.add("hidden"):
//         dropDown.classList.remove("hidden")
//       };
//     accountWrapper.appendChild(avatar);
//     accountWrapper.appendChild(downArrow);
//     avatar.src =
//       "https://occ-0-58-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71";
//       downArrow.classList.add("ti-angle-down")

// }
function openDropList() {
  accountWrapper.onclick = function () {
    !dropDown.classList.contains("hidden")
      ? dropDown.classList.add("hidden")
      : dropDown.classList.remove("hidden");
  };
}
if (isLogin) {
  removeSignIn();
  openDropList()
}
