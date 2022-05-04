document.querySelector("header").innerHTML = `
<nav class="navbar nav-colored">
    <div class="nav-left">
        <span
        class="hamburger"
        style="font-size: 30px; cursor: pointer"
        onclick="openNav()"
        >&#9776;</span
        >

        <div id="sideNav" class="sideNav">
        <div class="navigation-menu-settings">
            <li class="has-inline-left-gutter navigation-menu-profile">
              <img
                src="https://occ-0-58-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71"
                class="header-profile-avatar"
              />
            </li>
          </div>
        <div class="navigation-menu-settings" style={margin-top:0;}>
            <div><a href="../../../index.html">Home</a></div>
            <div hidden class="admin-dashboard"><a href="../../../pages/movie/admin_dashboard.html">Dashboard</a></div>
            <div><a href="../../../pages/user/user_profile.html">My Profile</a></div>
            <div><a href="#">Watch History</a></div>
            <div><a href="#">Watch Later</a></div>
        </div>
        <div class="navigation-menu-settings">
            <div><a href="../../../pages/info/aboutUs.html">About @dramaholic</a></div>
            <div><a href="../../../pages/info/policy.html">Policy</a></div>
        </div>
        <a href="../../pages/user/login.html"
            ><button class="sign-in-subBar">SIGN OUT</button></a
        >
        </div>

        <div class="page_title_nav" id="page_title_nav"></div>
    </div>

   

    <div class="nav-right">
        <div class="dropdown" id="account_navigate" onclick="account_onclick()">
            <div style="width: max-content;">Account</div>
            <div class="dropdown-content">
                <div>
                    <a href="../../pages/user/user_profile.html">
                        <i class="fas fa-user" style="font-size: 15px;"></i>
                        Profile
                    </a>
                </div>
                <div class="admin-dashboard" hidden>
                    <a href="../../pages/movie/admin_dashboard.html">
                        <i class="fa fa-video" style="font-size: 15px;"></i>
                        Dashboard
                    </a>
                </div>
                <div>
                <a href="../../pages/user/login.html">
                    <i class="fas fa-sign-out-alt" style="font-size: 15px;"></i>
                    Sign Out
                </a>
                </div>
            </div>
        </div>
        <div>|</div>
        <div class="image-container" id="logo_nav">
        <a href="javascript:window.location.reload(true)"
        ><img src="../../assets/image/logo.png" alt="DramaHolic" class="logo"
        /></a>
    </div>
    </div>
</nav>
`;

let user = localStorage.getItem("UserID")
// let current_user = sessionStorage.getItem('UserID')
fetch(`https://dramaholic.herokuapp.com/api/customers/${user}`)
.then((response) => response.json())
.then((user) => {
    if (user.admin == null) {
        let a = document.querySelectorAll(".admin-dashboard")
        for (let i=0; i<a.length; i++) {
            a[i].removeAttribute("hidden")
        }
    }
})
.catch((error) => {
    console.log(error); 
});