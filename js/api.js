/**
 * Declaration of variables from url to write more accurately the code, improve readiness and test options
 */
const baseUrl = "https://api.themoviedb.org/3";
const language = "fr-FR";
const page = 1;
// Date is updated everyday dynamically :
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

/**
 * Authentification to API TMDB
 */
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWFiNDI0MzA2OTVkNjdlYmM4YWViMTFhYTFlY2U1NiIsInN1YiI6IjY1ZGM5ZTY2ZWQyYWMyMDE4NzQyNTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.htSCu9rIHzrhwKld6Bizm5qIaA_hjzu4ApghLM3rdjI'
    }
};


/**
 * Checks if the response from the API is valid.
 * Throws an error if the response is not valid.
 * @param {Response} response - The response from the API.
 * @returns {Response} - The response if it is valid.
 * @throws {string} - Error message if the response is not valid.
 */
function checkIfResponseIsValid(response) {
    if (response.ok) {
        if (response.status == 200) {
            return response;
        }
    }
    throw 'Invalid request';
}

/**
 * Fetches movies from the specified URL.
 * @param {string} url - The URL to fetch movies from.
 * @returns {Promise<Object>} - A promise that resolves to the fetched movies.
 */
async function fetchMovies(url) {
    const response = await fetch(url, options);
    return checkIfResponseIsValid(response).json();
}

/**
 * Retrieves upcoming movies.
 * If params are provided, filters the movies based on the params.
 * @param {Object} [params={}] - Optional parameters for filtering the movies.
 * @param {boolean} [params.includeAdult=false] - Whether to include adult movies.
 * @param {string} [params.primaryReleaseDateGte='formatedCurrentDate'] - The minimum release date for movies.
 * @param {string} [params.primaryReleaseDateLte=''] - The maximum release date for movies.
 * @param {string} [params.sortBy='primary_release_date.asc'] - The sorting criteria for movies.
 * @param {string} [params.region='FR'] - The region for movies.
 * @param {number[]} [params.withGenres=[]] - An array of genre IDs for filtering movies.
 * @returns {Promise<Object>} - A promise that resolves to the fetched movies.
 */
export async function getMovies(params = {}) {
    if (Object.keys(params).length === 0) {
        const url = `${baseUrl}/movie/upcoming?language=${language}&page=${page}&primary_release_date.gte=${formattedCurrentDate}&sort_by=primary_release_date.asc`;
        console.log("url : ", url);
        console.log('getMovie ', fetchMovies(url));
        return fetchMovies(url);
    } else {
        const {
            includeAdult = false,
            primaryReleaseDateGte = '2000-01-01',
            primaryReleaseDateLte = formattedCurrentDate,
            sortBy = 'primary_release_date.asc',
            region = 'FR',
            with_genres = '28|12|16|35|80|99|18|10751|14|36|27|10402|9648|10749|878|10770|53|10752|37' 
        } = params;

        const queryParams = new URLSearchParams({
            include_adult: includeAdult,
            language,
            'primary_release_date.gte': primaryReleaseDateGte,
            'primary_release_date.lte': primaryReleaseDateLte,
            page,
            sort_by: sortBy,
            region,
            with_genres
        });

        const url = `${baseUrl}/discover/movie?${queryParams}`;
        console.log('include_adult :', includeAdult);
        console.log("url : ", url);
        console.log('getMovie ', fetchMovies(url));
        return fetchMovies(url);
    }
  
}

/**
 * Finds a movie by its ID.
 * @param {number} filmId - The ID of the movie to find.
 * @returns {Promise<Object>} - A promise that resolves to the found movie.
 */
export async function findMovie(filmId) {
    const url = `${baseUrl}/movie/${filmId}?language=${language}`;
    return fetchMovies(url);
}

/**
 * Retrieves recommendations for a movie.
 * @param {number} filmId - The ID of the movie to retrieve recommendations for.
 * @returns {Promise<Object>} - A promise that resolves to the recommended movies.
 */
export async function recommandation(filmId) {
    const url = `${baseUrl}/movie/${filmId}/recommendations?language=${language}&page=${page}&sort_by=primary_release_date.asc`;
    return fetchMovies(url);
}

/**
 * Retrieves trending movies based on weekly popularity (votes? to be checked on documentation).
 * @returns {Promise<Object>} - A promise that resolves to the trending movies.
 */
export async function trendingWeeklyMovies() {
    const url = `${baseUrl}/trending/movie/week?language=${language}`;
    return fetchMovies(url);
}

/**
 * Retrieves the list of movie genres, in french.
 * @returns {Promise<Object>} - A promise that resolves to the list of movie genres.
 */
export async function getGenre() {
    const url = `${baseUrl}/genre/movie/list?language=fr`;
    return fetchMovies(url);
}
