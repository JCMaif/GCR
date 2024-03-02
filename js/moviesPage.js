import displayDetailPage from "./detailPage.js";
import { getMovies } from "./api.js";

export default function displayMoviesPage(applicationSection, films, totalPages, currentPage, searchParams) {
    const parameterSection = document.createElement('section');
    parameterSection.classList.add('parameter-section');

    const includeAdultLabel = createInputLabel('Pour adultes :');
    const includeAdultSelect = createSelectOption(['No', 'Yes'], ['false', 'true']);
    includeAdultLabel.appendChild(includeAdultSelect);

    // Créer les champs de date
    const primaryReleaseDateGteLabel = createInputLabel('Entre:');
    const primaryReleaseDateGteInput = createDateInput();
    primaryReleaseDateGteLabel.appendChild(primaryReleaseDateGteInput);

    const primaryReleaseDateLteLabel = createInputLabel('Et:');
    const primaryReleaseDateLteInput = createDateInput();
    primaryReleaseDateLteLabel.appendChild(primaryReleaseDateLteInput);

    const submitButton = createButton('Search', handleSearch);

    function createInputLabel(textContent) {
        const label = document.createElement('label');
        label.textContent = textContent;
        return label;
    }

    function createSelectOption(optionsText, optionsValue) {
        const select = document.createElement('select');
        optionsText.forEach((text, index) => {
            const option = document.createElement('option');
            option.textContent = text;
            option.value = optionsValue[index];
            select.appendChild(option);
        });
        return select;
    }

    function createDateInput() {
        const input = document.createElement('input');
        input.type = 'date';
        return input;
    }

    function createButton(textContent, onClick) {
        const button = document.createElement('button');
        button.textContent = textContent;
        button.addEventListener('click', onClick);
        return button;
    }
    // Fonction qui récupère les données du formulaire et construit les paramètres de recherche de films    
    function handleSearch(e) {
        e.preventDefault();
        const params = {
            includeAdult: includeAdultSelect.value === 'true',
            primaryReleaseDateGte: primaryReleaseDateGteInput.value,
            primaryReleaseDateLte: primaryReleaseDateLteInput.value,
            page: 1 // Réinitialiser la page à 1 lors d'une nouvelle recherche
        };

        getMovies(params)
            .then(({ results, total_pages }) => {
                displayMoviesPage(applicationSection, results, total_pages, 1, params); // Passer les paramètres de recherche
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    // Fonction pour gérer la pagination
    function displayPagination(totalPages, currentPage, searchParams) {
        let paginationSection = document.querySelector('.pagination-section');

        if (!paginationSection) {
            paginationSection = document.createElement('section');
            paginationSection.classList.add('pagination-section');
            const searchZoneSection = document.querySelector(".searchZone");
            searchZoneSection.appendChild(paginationSection);
        } else {
            paginationSection.innerHTML = ''; // Nettoyer la section de pagination existante
        }

        // Bouton "Précédent"
        const previousButton = createButton('Précédent', () => {
            if (currentPage > 1) {
                searchParams.page = currentPage - 1; // Décrémenter le numéro de page
                getMovies(searchParams)
                    .then(({ results }) => {
                        displayMoviesPage(applicationSection, results, totalPages, currentPage - 1, searchParams); // Passer les paramètres de recherche
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
        previousButton.disabled = currentPage === 1;

        // Affichage du numéro de page
        const pageNumberDisplay = document.createElement('span');
        pageNumberDisplay.textContent = `Page ${currentPage} sur ${totalPages}`;

        // Bouton "Suivant"
        const nextButton = createButton('Suivant', () => {
            if (currentPage < totalPages) {
                const nextPage = currentPage + 1;
                const params = { ...searchParams, page: nextPage };
                displayMoviesPage(applicationSection, films, totalPages, nextPage, params);
            }
        });
        nextButton.disabled = currentPage === totalPages;

       // paginationSection.appendChild(previousButton);
       // paginationSection.appendChild(pageNumberDisplay);
       // paginationSection.appendChild(nextButton);
    }


    function createParameterSelectors() {
        submitButton.addEventListener('click', handleSearch);

        if (!document.querySelector('.parameter-section')) { // sans ça, le formulaire est ajouté à chaque rechargemennt de page
            // Ajouter la section des paramètres à la section des paramètres
            parameterSection.appendChild(includeAdultLabel);
            parameterSection.appendChild(primaryReleaseDateGteLabel);
            parameterSection.appendChild(primaryReleaseDateLteLabel);

            // Ajouter le bouton de soumission
            parameterSection.appendChild(submitButton);

            // Sélection de la section dans le index.html
            const searchZoneSection = document.querySelector(".searchZone");

            // Ajoutez la section des paramètres à la section ciblée
            searchZoneSection.appendChild(parameterSection);
        }
        // Ajouter la pagination
        displayPagination(totalPages, currentPage);
    }
    
    // fonction pour créer les cartes des films
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
        return filmCard;
    };

    // fonction pour créer la page qui contient les cartes des films
    function createMoviesPage(applicationSection, films) {
        applicationSection.id = "movies";
        applicationSection.classList.add("film-grid");
        const divFilms = document.createElement('div');
        divFilms.className = "movies film-grid";

        applicationSection.innerHTML = '';
        films.forEach(film => {
            const filmCard = createCard(film);

            applicationSection.appendChild(filmCard);
            filmCard.addEventListener("click", () => {
                displayDetailPage(applicationSection, film.id);
            });
        });
    }

    createParameterSelectors();
    createMoviesPage(applicationSection, films);
}
