import { trendingWeeklyMovies } from "./api.js";
import { displayScrollMovies } from "./utils.js";
import displayDetailPage from "./detailPage.js";

export default async function displayLandingPage(applicationSection){
    const trending = await trendingWeeklyMovies();
    const trendingList = trending.results;

    applicationSection.id = "landing";
    applicationSection.innerHTML = `
        <h2 class="landing-title">Les films les plus appréciés</h2>
    <p class="landing-paragraph">Voici une sélection de films qui ont reçu les meilleures notes au cours de la dernière semaine</p>
    <section class="film-trending">
    </section>

     
    `;
    const filmTrendingSection = document.querySelector(".film-trending");
    displayScrollMovies(filmTrendingSection, trendingList, (filmId) => {
        displayDetailPage(applicationSection, filmId);
    });
}
