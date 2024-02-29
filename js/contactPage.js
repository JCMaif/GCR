export default function displayContactPage(applicationSection) {
  applicationSection.id = "contact";
  applicationSection.innerHTML = `
    <form id="formulaire">
        <div class="formulaire">
            <h1>Contactez-nous</h1>
            <div class="separation"></div>
            <div class="corps-formulaire">
                <div class="gauche">
                    <div class="groupe">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" id="userName" name="username" placeholder="Votre prénom">
                        <span id="error_user"></span>
                    </div>
                    <div class="groupe">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="email" name="email" placeholder="Votre addresse e-mail">
                        <span id="error_email"></span>
                    </div>
                    <div class="groupe">
                        <i class="fa-solid fa-phone-volume"></i>
                        <input type="text" id="telephone" name="telephone" placeholder="Votre numéro de téléphone">
                        <span id="error_telephone"></span>
                    </div>
                </div>
                <div class="droite">
                    <div class="groupe">
                        <label for="">Message</label>
                        <textarea placeholder="Ecrivez votre messages..."></textarea>
                    </div>  
                </div>
                <div class="pied-formulaire" align="center">
                <button type="submit">Envoyer le message</button>
                </div>
            </div>
        </div>
    </form>`;
}
