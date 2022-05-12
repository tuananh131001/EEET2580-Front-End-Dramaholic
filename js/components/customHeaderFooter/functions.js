function openNav() {
    const subNav = document.querySelector("#sideNav");
    console.log("huhu")
    subNav.style.width === ""
        ? (subNav.style.width = "50%")
        : (subNav.style.width = "");
    if (document.querySelector("#page_title_nav") != null)
        document.querySelector("#page_title_nav").removeAttribute('hidden')
};

function handleSignOut() {
    localStorage.removeItem("UserID");
    localStorage.removeItem("isLogin");
    location.reload();
}