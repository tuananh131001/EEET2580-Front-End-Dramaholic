function account_onclick() {
    console.log("haha")
};

function openNav() {
    const subNav = document.querySelector("#sideNav");
    subNav.style.width === ""
        ? (subNav.style.width = "60%")
        : (subNav.style.width = "");
        const input = document.querySelector(".search-bar")
        input.nodeValue = ""
};