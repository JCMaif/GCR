export function addFooter() {
    const footer = document.querySelector(".footer");
    footer.innerHTML = `
      <div class="reseau">
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-youtube"></i>
      </div>
      <div id="site-by">Volleywood Squad</div>
    `;
  }
  