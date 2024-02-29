import { trendingWeeklyMovies } from "./api.js";

export default async function displayLandingPage(applicationSection){
    const trending = await trendingWeeklyMovies();
    const trendingList = trending.results;
    console.log(trending);
    console.log(trendingList);
    applicationSection.id = "landing";
    applicationSection.innerHTML = `
    <section class="film-trending">
            <h2>Les films les plus appréciés</h2>
            <div class="scroll-container">
           
            </div>
        </section>
    `;
    const renderTrending = (trending) => {
        const filmContainer = document.querySelector(".scroll-container"); 
        trending.forEach((movie) => {
            const filmCard = document.createElement('div');
            filmCard.classList.add("film-card");
            filmCard.innerHTML= `
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                `;
                filmContainer.appendChild(filmCard);
              });
            };
            
            renderTrending(trendingList);
}