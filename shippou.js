const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjViOWQ4NTQzODM2OGYxMzg2OTc3MzlkMDY3NmU5MCIsInN1YiI6IjY1ZGI2NDU5ODI2MWVlMDE4NWMyZmE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqaglO-GjtRSZOQomGgTqN6cuNF7LE1oecefis70Kds'
const base_url = new URL('https://api.themoviedb.org')
const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: "2-digit",
  day: "2-digit"
})

/**
 * 
 * @param {Response} response 
 * @returns Response
 */
function checkIfResponseIsValid(response) {
  if (response.ok) {
    if (response.status == 200) {
      return response
    }
  }
  throw 'Invalid request'
}

function transformToJSON(data) {
return data.json()
}

/**
 * 
 * @param {URL} url 
 * @param {any} params key value object to add to the search params
 * @returns 
 */
function addUrlParams(url, params) {
for (let [key, value] of Object.entries(params)) {
  url.searchParams.set(key, value)
}
return url
}

/**
 * 
 * @param {Date} date Date object to format in string 'yyyy/mm/dd'
 * @returns {string}
 */
function formatDateToString(date) {
  return dateFormatter
    .format(date)
    .split('/')
    .reverse()
    .join('/')
}

/**
 * 
 * @returns {{page: number, results: any[], total_pages: number, total_results: number}} Response object from the IMDB API
 */
async function listFilms() {
const url = addUrlParams(new URL('/3/discover/movie', base_url), {
  'language': 'fr-FR',
  'sort_by': 'primary_release_date.dsc',
  'page': 1,
  'release_date.gt': formatDateToString(new Date())
})

return fetch(url, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}).then(checkIfResponseIsValid)
  .then(transformToJSON)
}

/**
 * 
 * @param {unknown} movie Movie object from IMDB API response
 * @returns a new <div> element with movie's infos
 */
function generateFilmHTLM(movie) {
  const movieEl = document.createElement('div')
  movieEl.innerHTML = `<h2>${movie.title}</h2>
<img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}}"/>
`
  return movieEl
}

/**
 * 
 * @param {string | Element} selector Destination where to place the elements
 * @param {Element[]} moviesEl Elements to add to the selected destination
 */
function appendTo(selector, moviesEl) {
  const dest = selector instanceof Element ? selector : document.querySelector(selector)
  dest.append(...moviesEl)
}

window.addEventListener('load', _=> {
  listFilms()
    .then(response => response.results)
    .then(list => list.map(generateFilmHTLM))
    .then(filmsEl => appendTo('main', filmsEl))
    .catch(e=>console.error(e))
})