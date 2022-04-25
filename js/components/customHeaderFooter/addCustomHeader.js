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
          <ol class="navigation-menu-settings">
            <li class="has-inline-left-gutter navigation-menu-profile">
              <img
                src="https://occ-0-58-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71"
                class="header-profile-avatar"
              />
              <div
                class="navigation-menu-profile-link"
                data-href="/ProfilesGate"
              >
                <p
                  class="navigation-menu-profile-name"
                  data-href="/ProfilesGate"
                >
                  Tuan Anh
                </p>
                <p
                  class="navigation-menu-profile-text"
                  data-href="/ProfilesGate"
                >
                  Switch Profiles
                </p>
              </div>
            </li>
            <li
              class="has-inline-left-gutter navigation-menu-setting"
              data-href="/YourAccount"
            >
              Account
            </li>
            <li
              class="has-inline-left-gutter navigation-menu-setting"
              data-href="https://help.netflix.com/"
            >
              Help Centre
            </li>
            <li
              class="has-inline-left-gutter navigation-menu-setting"
              data-href="/SignOut?lnkctr=mL"
            >
              Sign out of Netflix
            </li>
          </ol>
          <div class="navigation-menu-settings">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
          <div class="navigation-menu-settings">
            <a href="#">Home</a>
            <a href="#">My List</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
          <a href="../../pages/user/login.html"
            ><button class="sign-in-subBar">SIGN IN</button></a
          >
        </div>

        <div class="image-container">
          <a href="javascript:window.location.reload(true)"
            ><img src="../../assets/image/logo.png" alt="DramaHolic" class="logo"
          /></a>
        </div>
      </div>
      <div class="nav-right">
        <a href="../../pages/user/login.html"
          ><button class="sign-in-nagivation" >SIGN OUT</button></a
        >
      </div>
    </nav>
`;
