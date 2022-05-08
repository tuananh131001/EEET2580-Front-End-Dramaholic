function openNav() {
    const subNav = document.querySelector("#sideNav");
    subNav.style.width === ""
        ? (subNav.style.width = "50%")
        : (subNav.style.width = "");
    document.querySelector("#page_title_nav").removeAttribute('hidden')
};

function handleSignOut() {
    localStorage.removeItem("UserID");
    localStorage.removeItem("isLogin");
    location.reload();
}