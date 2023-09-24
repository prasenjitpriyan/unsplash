## **Artify | A virtual visual art gallery**

This repository contains a virtual visual art gallery named Artify built using HTML5,
CSS3 and Javascript.Please follow the instruction to set it up.

**Features**

1. Art categories
2. Search for desired products
3. Add to favourites
4. Customized art gallery with favourite art forms

[Working Demo] (http://www.artify.com)
  




**Instructions**
1. Clone the repo and run ``npm install``
2. From the Artify folder run ``npm run dev``

---
**BASIC HTML CODE FOR THE INTRODUCTORY PAGE**

<!-- <div class="background-image">
    <div class="background-text">
      <h1>Art House</h1>
      <p>
        Give wings to your creative mind with your journey through our
        magnificent world of visual art
      </p>
      <form action="">
        <input type="text" id="search-box" placeholder="Enter the Art House....">
        <button id="search">Search</button>  
      </form>
    </div>
  </div> -->

  
    <div id="main"></div>
    <!-- <div>
      <button id="show-more">Show more</button>
    </div> -->
    ---

  **BASIC CSS CODE**


root {
  --theme-color: #0996a0
}
 {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Poppins', sans-serif;
 }
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #FFF;
  padding: 1rem 1.5rem;
  box-shadow: 0px 2px 2px rgba(0,0,0,0.1);
  z-index: 1;
  font-size: .9rem;
}
header #logo {
  font-size: 1.5rem;
  font-weight: bolder;
  color: var(--theme-color)
}

header ul {
  list-style: none;
  display: flex;
}
header ul li {
  margin: 0 0.5rem;
  cursor: pointer;
}
header ul li:hover {
  color: var(--theme-color);
  font-weight: bolder;
}
.active {
  color: var(--theme-color)
}
.background-image{
  padding-top: 175px;
  padding-bottom: 175px;
  position: relative;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
}
.background-text{
  text-align: center;
  color: black;
}
.background-text h1{
  font-size: 2 rem;
  padding-bottom: 10px;
}

**BASIC JAVASCRIPT CODE**



const main = document.querySelector("#main");
const header = document.querySelector("#header");
header.append(logo);
header.append(nav);
const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get("section");
getPhotos({
  query: section || "Art",
}).then((photos) => {
  renderPhotos(photos);
});

