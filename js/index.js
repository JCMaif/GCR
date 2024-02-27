import displayContactPage from "./contactPage.js";
import displayLandingPage from "./landingPage.js";

/**
 * Fonction principale appelée au chargement de la page
 */
window.addEventListener("load", async () => {
  const requested_page = new URL(document.location.href).hash;
  const applicationSection = document.querySelector(".application");

  //-------------Fetch API----------------------
  /**
   * Paramètres de l'API TMDB
   */
  const baseUrl = "https://api.themoviedb.org/3"; // URL de base de l'API TMDB
  const language = "fr-FR";
  const page = 1;

  /**
   * Fonction pour récupérer la clé API à partir d'un fichier de configuration
   */
  const fetchApiKey = async () => {
    try {
      const credentialsUrl = "credentials.json";
      const response = await fetch(credentialsUrl);
      const credentials = await response.json();
      return credentials.apiKey;
    } catch (error) {
      console.error("Erreur de récupération de la clé API:", error);
      return null;
    }
  };

  /**
   * Fonction pour construire l'URL des prochaines sorties de films
   */
  const upcomingMoviesUrl = (apiKey) => {
    return `${baseUrl}/discover/movie?api_key=${apiKey}&language=${language}&page=${page}&primary_release_date.gte=2024-02-27&sort_by=primary_release_date.asc`;
  };

  // Récupération de apiKey
  const apiKey = await fetchApiKey();
  if (!apiKey) return;

  // ---------------------Listeners Nav----------------------
  const landingPageBtn = document.querySelector(".landing");
  const moviesPageBtn = document.querySelector(".movies");
  const contactPageBtn = document.querySelector(".contact");
  /**
   * Listen for click event on the landing page button
   */
  landingPageBtn.addEventListener("click", () => {
    displayLandingPage(applicationSection);
  });
  moviesPageBtn.addEventListener("click", () => {
    displayMoviesPage();
  });
  contactPageBtn.addEventListener("click", () => {
    displayContactPage(applicationSection);
  });

  //---------------------Tous les films----------------------
  const displayMoviesPage = async () => {
    /**
     * Fonction pour trier les films par date de sortie
     */
    const sortFilmsByReleaseDate = (films) =>
      [...films].sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    /**
     * Fonction pour créer une carte de film
     */
    const createFilmCard = (film) => {
      const { id, title, poster_path, release_date } = film;
      const releaseDate = new Date(release_date);
      const formattedReleaseDate = `${releaseDate.getDate()}/${
        releaseDate.getMonth() + 1
      }/${releaseDate.getFullYear()}`;

      const filmCard = document.createElement("div");
      filmCard.classList.add("film-card");
      filmCard.dataset.filmId = id;

      const filmCardContent = `
  <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="film-poster">
  <div class="film-info">
    <h2 class="film-title">${title}</h2>
    <p class="release-date">Date de sortie : ${formattedReleaseDate}</p>
  </div>`;
      filmCard.innerHTML = filmCardContent;
      return filmCard;
    };

    /**
     * Fonction pour afficher les cartes de films
     */
    const renderFilmCards = (films) => {
      //const applicationSection = document.querySelector('.application');
      applicationSection.id = "movies";
      applicationSection.classList.add("film-grid");
      applicationSection.innerHTML = "";
      films.forEach((film) => {
        const filmCard = createFilmCard(film);
        filmCard.addEventListener("click", () => {
          navigateToFilmDetailsPage(film.id);
        });
        applicationSection.appendChild(filmCard);
      });
    };
    //----------------
    /**
     * Recheche des films
     */
    const apiUrl = upcomingMoviesUrl(apiKey);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        const films = data.results;
        const sortedFilms = sortFilmsByReleaseDate(films);
        renderFilmCards(sortedFilms);
      } else {
        console.error(
          "Erreur lors de la récupération des données :",
          data.status_message
        );
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  /**
   * Fonction pour naviguer vers la page de détails du film
   */
  const navigateToFilmDetailsPage = async (filmId) => {
    try {
      const filmDetails = await findMovie(filmId);
      renderFilmDetails(filmDetails);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du film :",
        error
      );
    }
  };
  /**
   * Fonction pour récupérer les détails d'un film
   */
  const findMovie = async (filmId) => {
    const apiKey = await fetchApiKey();
    if (!apiKey) return;

    const detailUrl = `${baseUrl}/movie/${filmId}?api_key=${apiKey}&language=${language}`;

    try {
      const response = await fetch(detailUrl);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des détails du film");
      }
      return await response.json();
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du film :",
        error
      );
      return null;
    }
  };
  /**
   * Fonction pour afficher les détails d'un film
   */
  const renderFilmDetails = (filmDetails) => {
    const { title, poster_path, release_date, overview, runtime, genres } =
      filmDetails;

    const releaseDate = new Date(release_date);
    const formattedReleaseDate = `${releaseDate.getDate()}/${
      releaseDate.getMonth() + 1
    }/${releaseDate.getFullYear()}`;

    const filmDetailsHTML = `
    <div class="film-details">
      <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="film-poster">
      <div class="film-info">
        <h2 class="film-title">${title}</h2>
        <p class="release-date">Date de sortie : ${formattedReleaseDate}</p>
        <p class="overview">${overview}</p>
        <p class="runtime">Durée : ${runtime} minutes</p>
        <p class="genres">Genres : ${genres
          .map((genre) => genre.name)
          .join(", ")}</p>
      </div>
    </div>`;

    const filmDetailsContainer = document.createElement("div");
    filmDetailsContainer.innerHTML = filmDetailsHTML;
    applicationSection.id = "filmDetail";
    applicationSection.innerHTML = "";
    applicationSection.appendChild(filmDetailsContainer);
  };

  // je récupère mon élément Formulaire par son ID.
  let formulaire = document.getElementById("formulaire");

  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
  });

  // j'ajoute une écouteur d'evenement à la soumission du formulaire.
  formulaire.addEventListener("input", (e) => {
    const target = e.target.name;
    if (target == "username") {
      //j'autorise les lettres + (-) + (espace)
      let myRegex = /^[a-zA-Z-\s]+$/;
      let errorUser = document.getElementById("error_user");
      if (!e.target.value) {
        errorUser.innerHTML = "Veuillez saisir votre prénom";
        errorUser.style.color = "red";
      } else if (myRegex.test(e.target.value) == false) {
        let errorUser = document.getElementById("error_user");
        errorUser.innerHTML = "Veuilez saisir un prénom valide";
        errorUser.style.color = "red";
      } else {
        errorUser.innerHTML = "";
      }
    } else if (target == "email") {
      if (!e.target.value) {
        let errorEmail = document.getElementById("error_email");
        errorEmail.innerHTML = "Veuillez saisir votre email";
        errorEmail.style.color = "red";
      }
    } else if (target == "telephone") {
      //j'autorise les chiffres, les points, les espaces
      myRegex = /^[0-9.\s]+$/;
      if (!e.target.value) {
        let errorTelephone = document.getElementById("error_telephone");
        errorTelephone.innerHTML = "Veuillez saisir un numéro de téléphone";
        error.style.color = "red";
      } else if (myRegex.test(e.target.value) == false) {
        let errorTelephone = document.getElementById("error_telephone");
        errorTelephone.innerHTML =
          "Veuilez saisir un numéro de téléphone valide";
        errorTelephone.style.color = "red";
      }
    }

    // Message envoie Pop-Up
  });

  // Check the root and keep it when reload
  if (requested_page == "#contact") {
    displayContactPage(applicationSection);
  } else if (requested_page == "#films") {
    displayMoviesPage();
  } else {
    displayLandingPage(applicationSection);
  }

  // -------------------Footer------------------------------
  // évènement ajouté au chargement de la page avec ajout direct d'html dans le DOM (footer)
  document.querySelector(".footer").innerHTML = `
  
      <div class="reseau">
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-youtube"></i>
      </div>
      <div id="site-by">
      </div>`;
});
