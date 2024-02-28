// Fonction pour interroger l'API et récupérer les films
const fetchMovies = async (pageNumber) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=fr-FR&page=${pageNumber}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des films');
    }
    return response.json();
  };
  
  // Fonction pour interroger l'API et récupérer les détails d'un film
  const fetchFilmDetails = async (filmId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=YOUR_API_KEY&language=fr-FR`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des détails du film');
    }
    return response.json();
  };
  
  // Fonction pour afficher les films
  const renderMovies = (movies) => {
    const moviesHTML = movies.results.map(movie => `
      <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        <h2>${movie.title}</h2>
      </div>
    `).join('');
  
    const moviesContainer = document.createElement('div');
    moviesContainer.innerHTML = moviesHTML;
    applicationSection.id = "movies";
    applicationSection.innerHTML = '';
    applicationSection.appendChild(moviesContainer);
  };
  
  // Fonction pour afficher les détails d'un film
  const renderFilmDetails = (filmDetails) => {
    const { title, poster_path, release_date, overview, runtime, genres } = filmDetails;
  
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
    `;
  
    const filmDetailsContainer = document.createElement('div');
    filmDetailsContainer.innerHTML = filmDetailsHTML;
    applicationSection.id = "filmDetail";
    applicationSection.innerHTML = '';
    applicationSection.appendChild(filmDetailsContainer);
  };
  
  // Fonction pour afficher la page d'accueil
  const displayLandingPage = () => {
    applicationSection.id = "landing";
    applicationSection.innerHTML = `
      <h1>Bienvenue sur notre site</h1>
      <p>Recherchez et découvrez les films populaires</p>
      <button id="movies-button">Voir les films</button>
    `;
  };
  
  // Fonction pour afficher la page des films
  const displayMoviesPage = async () => {
    try {
      const movies = await fetchMovies(1);
      renderMovies(movies);
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
    }
  };
  
  //