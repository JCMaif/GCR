const api = 'https://api.themoviedb.org/3/movie/now_playing?api_key=caab42430695d67ebc8aeb11aa1ece56&language=fr-FR';


const getMovies = async () => {
    try {
        const response = await fetch(api);
        const jsonData = await response.json();

        console.log(jsonData);
    } catch (error) {

    }
}


function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('movie-card');

  const poster = document.createElement('img');
  poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  card.appendChild(poster);

  const title = document.createElement('h2');
  title.textContent = movie.title;
  card.appendChild(title);

  const releaseDate = document.createElement('p');
  releaseDate.textContent = movie.release_date;
  card.appendChild(releaseDate);

  return card;
}

async function hydrateApplication() {
  const movies = await getMovies();
  const application = document.querySelector('.application');

  movies.forEach(movie => {
    const card = createMovieCard(movie);
    application.appendChild(card);
  });
} 

 hydrateApplication();