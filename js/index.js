import displayContactPage from "./contactPage.js";
import displayLandingPage from "./landingPage.js";
import displayMoviesPage from "./moviesPage.js";
import { getMovies, findMovie, recommandation, trendingWeeklyMovies } from "./api.js";

/**
 * Fonction principale appelée au chargement de la page
 */
window.addEventListener("load", async () => {
  const requested_page = new URL(document.location.href).hash
  const applicationSection = document.querySelector('.application');

  //-------------Fetch API----------------------
 //console.log('upcoming films : ', await getMovies());
 //console.log('findMovie : ' , await findMovie(969492));
 //console.log('recommandations : ', await recommandation(969492));
 //console.log('trending : ' , await trendingWeeklyMovies());
 const movies = await getMovies();
 const moviesList = movies.results;
 //console.log(moviesList);

  // ---------------------Listeners Nav----------------------
  const landingPageBtn = document.querySelector('.landing');
  const moviesPageBtn = document.querySelector('.movies');
  const contactPageBtn = document.querySelector('.contact');
  /**
   * Listen for click event on the landing page button
   */
  landingPageBtn.addEventListener("click", () => {
    displayLandingPage(applicationSection);
  });
  moviesPageBtn.addEventListener("click", () => {
    displayMoviesPage(applicationSection, moviesList);
  });
  contactPageBtn.addEventListener("click", () => {
    displayContactPage(applicationSection);
  })

    // Check the root and keep it when reload
    if (requested_page == '#contact') {
      displayContactPage(applicationSection);
    } else if (requested_page == '#films') {
     // displayMoviesPage();
    } else {
      displayLandingPage(applicationSection);
    }

    // -------------------Footer------------------------------
    // évènement ajouté au chargement de la page avec ajout direct d'html dans le DOM (footer)
    document.querySelector('.footer').innerHTML = `
  
      <div class="reseau">
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-youtube"></i>
      </div>
      <div id="site-by">>Volleywood Squad
      </div>
 `;
  }
)