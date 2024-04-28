import { getPhotos, renderPhotos } from "./unsplash";

import { navItems } from "./nav";

const urlParams = new URLSearchParams(window.location.search);

export const logo = document.createElement("a");
logo.setAttribute("id", "logo");
logo.setAttribute("href", "/");
logo.innerHTML = "Artify";

export const nav = document.createElement("ul");

const handleNavListItemClick = async ({ title, isPage, link }) => {
  const notInHomePage = window.location.pathname !== "/";

  if (isPage) {
    window.location = link;
  } else {
    window.scrollTo(0, 0);

    if (notInHomePage) {
      window.location = `/?section=${title}`
    } else {
      let queryParams = new URLSearchParams(window.location.search);
      queryParams.set("section", title);
      history.replaceState(null, null, "?" + queryParams.toString());
    }

    getPhotos({
      query: title,
    }).then((photos) => {
      renderPhotos(photos);
    });
  }
};
const removeActiveClass = () => {
  for (let child of nav?.children) {
    child?.classList?.remove("active");
  }
};

navItems.forEach((item) => {
  const { title, isPage, link } = item;
  const titleEncoded = encodeURI(title.toLowerCase());

  const newListItem = document.createElement("li");
  newListItem.innerHTML = title;
  newListItem.setAttribute("id", titleEncoded);
  nav.append(newListItem);

  newListItem.addEventListener("click", () => {
    removeActiveClass();
    handleNavListItemClick({ title, isPage, link });
    newListItem.classList.add("active");
  });

  const section = urlParams.get("section");
  const isSection = section === title;

  if (isSection) {
    removeActiveClass();
    newListItem.classList.add("active");
  }

  if (isPage) {
    removeActiveClass();
    const isCurrentPage = window.location.pathname === link;
    if (isCurrentPage) {
      newListItem.classList.add("active");
    }
  }
});
