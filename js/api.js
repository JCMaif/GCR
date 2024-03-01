const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWFiNDI0MzA2OTVkNjdlYmM4YWViMTFhYTFlY2U1NiIsInN1YiI6IjY1ZGM5ZTY2ZWQyYWMyMDE4NzQyNTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.htSCu9rIHzrhwKld6Bizm5qIaA_hjzu4ApghLM3rdjI'
    }
};

const dateFormatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: "2-digit",
    day: "2-digit"
});

function formatDateToString(date) {
    return dateFormatter
      .format(date)
      .split('/')
      .reverse()
      .join('-');
}

function checkIfResponseIsValid(response) {
    if (response.ok) {
        if (response.status == 200) {
            return response
        }
    }
    throw 'Invalid request'
}

const baseUrl = "https://api.themoviedb.org/3";
const language = "fr-FR";
const page = 1;
const currentDate = new Date();
const formattedCurrentDate = formatDateToString(currentDate);
const primary_release_date = `primary_release_date.gte=${formattedCurrentDate}`;
const sort = "sort_by=primary_release_date.asc";



export async function getMovies() {
    return fetch(`${baseUrl}/movie/upcoming?language=${language}&page=${page}&${primary_release_date}&${sort}`, options)
        .then(checkIfResponseIsValid)
        .then(response => response.json())
        .catch(err => console.error(err));
};

export async function findMovie(filmId) {
    return fetch(`${baseUrl}/movie/${filmId}?language=${language}`, options)
        .then(checkIfResponseIsValid)
        .then(response => response.json())
        .catch(err => console.error(err));
};

export async function recommandation(filmId) {
    return fetch(`${baseUrl}/movie/${filmId}/recommendations?language=${language}&page=${page}&${sort}`, options)
        .then(checkIfResponseIsValid)
        .then(response => response.json())
        .catch(err => console.error(err));
};

export async function trendingWeeklyMovies() {
    return fetch(`${baseUrl}/trending/movie/week?language=${language}`, options)
        .then(checkIfResponseIsValid)
        .then(response => response.json())
        .catch(err => console.error(err));
}
