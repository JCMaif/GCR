export default function displayContactPage(applicationSection) {

    applicationSection.id = "contact";
    applicationSection.innerHTML = `
    <form action="">
        <div class="formulaire">
            <h1>Contactez-nous</h1>
            <div class="separation"></div>
            <div class="corps-formulaire">
                <div class="gauche">
                    <div class="groupe">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" placeholder="Votre prénom">
                    </div>
                    <div class="groupe">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" placeholder="Votre addresse e-mail">
                    <div class="groupe">
                        <i class="fa-solid fa-phone-volume"></i>
                        <input type="text" placeholder="Votre numéro de téléphone">
                </div>
                <div class="droite">
                    <div class="groupe">
                        <label for="">Message</label>
                        <textarea placeholder="Ecrivez votre messages..."></textarea>
                    </div>
                </div>
            </div>
            <div class="pied-formulaire" align="center">
                <button>Envoyer le message</button>
            </div>
        </div>
    </form>`;
  }