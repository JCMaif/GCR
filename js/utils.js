/**
 * Affiche une liste de films dans un élément donné
 * @param {HTMLElement} parentElement L'élément où afficher les films
 * @param {Array} moviesList La liste des films à afficher
 * @param {Function} onClickCallback La fonction à appeler lorsqu'un film est cliqué
 */
export function displayScrollMovies(parentElement, moviesList, onClickCallback) {
    const filmContainer = document.createElement("div");
    filmContainer.classList.add("scroll-container");

    moviesList.forEach((movie) => {
        const filmCard = document.createElement("div");
        filmCard.classList.add("film-card");
        filmCard.dataset.filmId = movie.id; // Ajout de l'ID du film comme attribut de données
        filmCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        filmContainer.appendChild(filmCard);

        // Ajout d'un écouteur d'événement au clic sur la carte de film
        filmCard.addEventListener("click", () => {
            onClickCallback(movie.id);
        });
    });

    parentElement.appendChild(filmContainer);
}

 /**
 * Met à jour l'URL
 * @param {string} hash Nouvelle valeur de l'URL
 */
 export function updateUrl(hash) {
    history.pushState(null, null, hash);
  }