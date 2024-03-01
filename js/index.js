import displayContactPage from "./contactPage.js";
import displayLandingPage from "./landingPage.js";
import displayMoviesPage from "./moviesPage.js";
import { addFooter } from "./footer.js";
import { getMovies } from "./api.js";
import { updateUrl } from "./utils.js";

/**
 * Fonction principale appelée au chargement de la page
 */
window.addEventListener("load", async () => {
  // Sélection de l'élément d'application
  const applicationSection = document.querySelector(".application");

  // Chargement des films
  const moviesList = await loadMovies();

  // Écouteurs d'événements pour la navigation
  addEventListeners(applicationSection, moviesList);

  // Gestion de l'historique du navigateur
  window.addEventListener("popstate", () => {
    handleNavigation(applicationSection, moviesList);
  });

  // Vérification de l'URL demandée lors du rechargement de la page
  handleRequestedPage(applicationSection, moviesList);

  // Ajout du footer
  addFooter();
});

/**
 * Charge les films à partir de l'API
 * @returns {Promise<Array>} Liste des films
 */
async function loadMovies() {
  const movies = await getMovies();
  return movies.results;
}

/**
 * Ajoute des écouteurs d'événements pour la navigation
 * @param {HTMLElement} applicationSection Section d'application
 * @param {Array} moviesList Liste des films
 */
function addEventListeners(applicationSection, moviesList) {
  const landingPageBtn = document.querySelector(".landing");
  const moviesPageBtn = document.querySelector(".movies");
  const contactPageBtn = document.querySelector(".contact");

  landingPageBtn.addEventListener("click", () => {
    displayLandingPage(applicationSection);
    updateUrl("#landing");
  });

  moviesPageBtn.addEventListener("click", () => {
    displayMoviesPage(applicationSection, moviesList);
    updateUrl("#films");
  });

  contactPageBtn.addEventListener("click", () => {
    displayContactPage(applicationSection);
    updateUrl("#contact");
  });
}

/**
 * Gère la navigation en fonction de l'URL
 * @param {HTMLElement} applicationSection Section d'application
 * @param {Array} moviesList Liste des films
 */
function handleNavigation(applicationSection, moviesList) {
  const requestedPage = new URL(document.location.href);

  if (requestedPage.hash.startsWith("#detail")) {
    const filmId = requestedPage.hash.split("/")[1];
    displayDetailPage(applicationSection, filmId);
  } else if (requestedPage.hash === "#contact") {
    displayContactPage(applicationSection);
  } else if (requestedPage.hash === "#films") {
    displayMoviesPage(applicationSection, moviesList);
  } else {
    displayLandingPage(applicationSection);
  }
}

/**
 * Vérifie l'URL demandée lors du rechargement de la page
 * @param {HTMLElement} applicationSection Section d'application
 * @param {Array} moviesList Liste des films
 */
function handleRequestedPage(applicationSection, moviesList) {
  const requestedPage = new URL(document.location.href).hash;

  if (requestedPage === "#contact") {
    displayContactPage(applicationSection);
  } else if (requestedPage === "#films") {
    displayMoviesPage(applicationSection, moviesList);
  } else {
    displayLandingPage(applicationSection);
  }
}


