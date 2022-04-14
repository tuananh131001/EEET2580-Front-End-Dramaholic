export const header = `    <nav class="navbar nav-gradient">
<div class="nav-left">
  <span
    class="hamburger"
    style="font-size: 30px; cursor: pointer"
    onclick="openNav()"
    >&#9776;</span
  >

  <div id="sideNav" class="sideNav">
    <div class="navigation-menu-settings">
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <div class="navigation-menu-sections">
      <a href="#">Home</a>
      <a href="#">My List</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <a href="./login.html"
      ><button class="sign-in-subBar">SIGN IN</button></a
    >
  </div>

  <div class="image-container">
    <img src="./assets/image/logo.png" alt="" class="logo" />
  </div>
  <ul class="header-navigation-text text-shadow">
    <li href="#">Home</li>
    <li href="#">Series</li>
    <li href="#">Films</li>
    <li href="#">Trending</li>
  </ul>
</div>
<div class="nav-right">
  <div class="search-container">
    <input type="search" class="search-bar" />
    <span class="search-icon ti-search" onclick="openSearch()"></span>
  </div>

  <a href="./login.html"
    ><button class="sign-in-nagivation">SIGN IN</button></a
  >
</div>
</nav>`
