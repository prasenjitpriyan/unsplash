import { getPhotos, renderPhotos } from "./unsplash";
import { logo, nav } from "./header";

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



