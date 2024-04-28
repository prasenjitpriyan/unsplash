import { logo, nav } from "./header";

const header = document.querySelector("#header");

header.append(logo);
header.append(nav);

const _favoritePhotosLocalStorageKey = "favorite-photos";
const isFavoritesPage = window.location.pathname === "/favorites.html";

export const getFavoritesPhotosFromLocalStorage = () => {
  const favoritePhotosFromLocalStorage =
    JSON.parse(localStorage.getItem(_favoritePhotosLocalStorageKey)) || [];

  return favoritePhotosFromLocalStorage;
};

export const hasAlreadyFavorite = (photoId) => {
  const favoritePhotosFromLocalStorage = getFavoritesPhotosFromLocalStorage();
  return favoritePhotosFromLocalStorage.includes(photoId);
};

export const addFavorite = (element, photoId) => {
  const favoritePhotosFromLocalStorage = getFavoritesPhotosFromLocalStorage();
  favoritePhotosFromLocalStorage.push(photoId);
  localStorage.setItem(
    _favoritePhotosLocalStorageKey,
    JSON.stringify(favoritePhotosFromLocalStorage)
  );
  element.innerHTML = "❤️";
};

export const removeFavorite = (element, photoId) => {
  const favoritePhotosFromLocalStorage = getFavoritesPhotosFromLocalStorage();
  const index = favoritePhotosFromLocalStorage.indexOf(photoId);
  favoritePhotosFromLocalStorage.splice(index, 1);
  localStorage.setItem(
    _favoritePhotosLocalStorageKey,
    JSON.stringify(favoritePhotosFromLocalStorage)
  );
  element.innerHTML = "🤍";

  if (isFavoritesPage) {
    renderFavoritesList();
  }
};

export const renderFavorites = () => {
  const allFavoriteButtons = document.querySelectorAll("#fav-button");
  for (let favoriteButton of allFavoriteButtons) {
    const photoId = favoriteButton.dataset["photoId"];
    const isFavorite = hasAlreadyFavorite(photoId);
    if (isFavorite) {
      favoriteButton.innerHTML = "❤️";
    } else {
      favoriteButton.innerHTML = "🤍";
    }

    favoriteButton.addEventListener("click", (event) => {
      const photoId = event.target.dataset["photoId"];
      const isFavorite = hasAlreadyFavorite(photoId);
      if (isFavorite) {
        removeFavorite(favoriteButton, photoId);
      } else {
        addFavorite(favoriteButton, photoId);
      }
    });
  }
};

export const renderFavoritesList = () => {
  const favoritePhotosFromLocalStorage = getFavoritesPhotosFromLocalStorage();
  const favoritePhotosFromLocalStorageLength =
    favoritePhotosFromLocalStorage.length;

  const main = document.querySelector("#favorites-list");
  main.innerHTML = "";

  if (favoritePhotosFromLocalStorageLength === 0) {
    main.innerHTML =
      "<p>You don't have any favorite photos yet. try adding some first! 🤟</p>";
    return;
  }

  const getUrls = favoritePhotosFromLocalStorage.map((photoId) => {
    return `
        <div id='photo-card'>
            <img src="https://source.unsplash.com/${photoId}" id="${photoId}" />
            <div id='photo-card-action'>
                <button id='fav-button' data-photo-id="${photoId}">
                🤍
                </button>
            </div>
        </div>
        
        `;
  });
  main.innerHTML = getUrls.join("");

  renderFavorites();
};

if (isFavoritesPage) {
  renderFavoritesList();
}
