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
                <button type="submit" class="btn btn-light showPopup" value="Reset form">Envoyer le message</button>
                </div>
                <div id="popup">
                    <div id="popupContent">
                        <span id="closePopup"></i></span>
                        <p id="popupMessage">Votre message est bien transmis! L'équipe GCR reviendra vers vous dans les plus brefs délais.</p>
                    </div>
                </div>
            </div>
        </div>
    </form>`;
  }
/* 
   // je récupère mon élément Formulaire par son ID.
   let formulaire = document.getElementById("formulaire");

   formulaire.addEventListener("submit", (e) => {
     e.preventDefault();
     const data = Object.fromEntries(new FormData(e.target));
   });
 
   // j'ajoute une écouteur d'evenement à la soumission du formulaire.
   formulaire.addEventListener("input", (e) => {
     const target = e.target.name;
     if (target == "username") {
       //j'autorise les lettres + (-) + (espace)
       let myRegex = /^[a-zA-Z-\s]+$/;
       let errorUser = document.getElementById("error_user");
       if (!e.target.value) {
         errorUser.innerHTML = "Veuillez saisir votre prénom";
         errorUser.style.color = "red";
       } else if (myRegex.test(e.target.value) == false) {
         let errorUser = document.getElementById("error_user");
         errorUser.innerHTML = "Veuilez saisir un prénom valide";
         errorUser.style.color = "red";
       } else {
         errorUser.innerHTML = "";
       }
     } else if (target == "email") {
       if (!e.target.value) {
         let errorEmail = document.getElementById("error_email");
         errorEmail.innerHTML = "Veuillez saisir votre email";
         errorEmail.style.color = "red";
       }
     } else if (target == "telephone") {
       //j'autorise les chiffres, les points, les espaces
       myRegex = /^[0-9.\s]+$/;
       if (!e.target.value) {
         let errorTelephone = document.getElementById("error_telephone");
         errorTelephone.innerHTML = "Veuillez saisir un numéro de téléphone";
         error.style.color = "red";
       } else if (myRegex.test(e.target.value) == false) {
         let errorTelephone = document.getElementById("error_telephone");
         errorTelephone.innerHTML =
           "Veuilez saisir un numéro de téléphone valide";
         errorTelephone.style.color = "red";
       }
     }
 
     // Message envoie Pop-Up
   }); */