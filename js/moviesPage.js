import displayDetailPage from "./detailPage.js";

export default function displayMoviesPage(applicationSection, films){
    function createCard(film) {
        const { id, title, poster_path, release_date } = film;
        const releaseDate = new Date(release_date);
        const formattedReleaseDate = `${releaseDate.getDate()}/${releaseDate.getMonth() + 1}/${releaseDate.getFullYear()}`;

        const filmCard = document.createElement('div');
        filmCard.classList.add('film-card');
        filmCard.dataset.filmId = id;

        const filmCardContent = `
    <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="film-poster">
    <div class="film-info">
      <h2 class="film-title">${title}</h2>
      <p class="release-date">Date de sortie : ${formattedReleaseDate}</p>
    </div>
  `;
        filmCard.innerHTML = filmCardContent;
      /*   const cardId = filmCard.dataset.filmId;
        console.log(cardId); */
        return filmCard;
    };

    function createMoviesPage(applicationSection, films) {
        applicationSection.id = "movies";
        applicationSection.classList.add('film-grid');
        applicationSection.innerHTML = '';
        films.forEach(film => {
            const filmCard = createCard(film);

            applicationSection.appendChild(filmCard);
            filmCard.addEventListener("click", ()=>{
                displayDetailPage(applicationSection,film.id);
            });
        });
    }
    
createMoviesPage(applicationSection,films);
};