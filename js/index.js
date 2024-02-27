// évènement ajouté au chargement de la page avec ajout direct d'html dans le DOM (footer)
window.addEventListener('load', () => {
    document.querySelector('.footer').innerHTML += `
    <section class="footer">
        <div class="reseau">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-youtube"></i>
        </div>
        <div id="site-by">
        </div>
    </section>`;
});