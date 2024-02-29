import { findMovie, recommandation } from "./api.js";

export default async function displayDetailPage(applicationSection, filmId) {
  const movie = await findMovie(filmId);
  const recos = await recommandation(filmId);
  const recosResult = recos.results;
  //console.log(recosResult);
  const { title, poster_path, release_date, overview, runtime, genres } = movie;

  const renderFilmDetails = (movie) => {
    // const { title, poster_path, release_date, overview, runtime, genres } = filmDetails;

    const releaseDate = new Date(release_date);
    const formattedReleaseDate = `${releaseDate.getDate()}/${releaseDate.getMonth() + 1}/${releaseDate.getFullYear()}`;

    const filmDetailsHTML = `
  <div class="film-details">
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="film-poster">
    <div class="film-info">
      <h2 class="film-title">${title}</h2>
      <p class="release-date">Date de sortie : ${formattedReleaseDate}</p>
      <p class="overview">${overview}</p>
      <p class="runtime">Durée : ${runtime} minutes</p>
      <p class="genres">Genres : ${genres.map(genre => genre.name).join(', ')}</p>
    </div>
  </div>
  <section class="film-recommendations">
            <h2>Recommandations</h2>
            <div class="scroll-container">
                
            </div>
        </section>
`;

    const filmDetailsContainer = document.createElement('div');
    filmDetailsContainer.innerHTML = filmDetailsHTML;
    applicationSection.id = "filmDetail";
    applicationSection.innerHTML = '';
    applicationSection.appendChild(filmDetailsContainer);
  };
  const renderRecommendations = (recos) => {
    const filmRecommendations = document.querySelector('.scroll-container');
    recos.forEach((reco) => {
      const filmCard = document.createElement('div');
      filmCard.classList.add('film-card');
      filmCard.innerHTML = `
              <img src="https://image.tmdb.org/t/p/w500/${reco.poster_path}" alt="${reco.title}">
              <h3>${reco.title}</h3>
          `;
      filmRecommendations.appendChild(filmCard);
    });
  };
  renderFilmDetails(filmId);
  renderRecommendations(recosResult);

}