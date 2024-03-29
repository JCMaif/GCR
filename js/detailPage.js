import { findMovie, recommandation } from "./api.js";
import { displayScrollMovies, updateUrl } from "./utils.js";

export default async function displayDetailPage(applicationSection, filmId) {
  const searchZoneSection = document.querySelector(".searchZone");
  searchZoneSection.innerHTML = '';
  const movie = await findMovie(filmId);
  const recos = await recommandation(filmId);
  const recosResult = recos.results;
  const { title, poster_path, release_date, overview, runtime, genres } = movie;

  const renderFilmDetails = (movie) => {
    const releaseDate = new Date(release_date);
    const formattedReleaseDate = `${releaseDate.getDate()}/${releaseDate.getMonth() + 1
      }/${releaseDate.getFullYear()}`;

    const filmDetailsHTML = `
      <div class="film-details">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="film-poster">
        <div class="film-info">
          <h2 class="film-title">${title}</h2>
          <p class="release-date"Date de sortie : ${formattedReleaseDate}</p>
          <p class="overview">${overview}</p>
          <p class="runtime">Durée : ${runtime} minutes</p>
          <p class="genres">Genres : ${genres
        .map((genre) => genre.name)
        .join(", ")}</p>
        </div>
      </div>
      <section class="film-recommendations">
        <h2>Recommandations</h2>
        
      </section>
    `;

    const filmDetailsContainer = document.createElement("div");
    filmDetailsContainer.innerHTML = filmDetailsHTML;
    applicationSection.id = "filmDetail";
    applicationSection.innerHTML = "";
    applicationSection.appendChild(filmDetailsContainer);

    const filmRecommendationsSection = filmDetailsContainer.querySelector(".film-recommendations");
    displayScrollMovies(filmRecommendationsSection, recosResult, (filmId) => {
      displayDetailPage(applicationSection, filmId);
    });
  };

  renderFilmDetails(movie);

  // Mettre à jour l'URL avec l'ID du film
  updateUrl(`#detail/${filmId}`);
}
