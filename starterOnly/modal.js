
function editNav() {
  icon.style.display = "none";
  const x = document.getElementById("myTopnav");
  const aTab = document.querySelectorAll("a")
  if (x.className === "topnav") {
    x.classList.add("responsive");
  } else {
    x.className = "topnav";
  }
  aTab.forEach((a)=> a.addEventListener("click", () => { 
    icon.style.display = "block";
    x.classList.remove("responsive");
  })
  )
}
const icon = document.querySelector(".icon");
icon.addEventListener("click", editNav);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const close = document.querySelector(".close");
const formReverve = document.querySelector("#reverve");
const sendConfirm = document.querySelector(".sendConfirm");
sendConfirm.style.display = "none";
const modalBtnClose = document.querySelector(".btn-closeModal");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//close modal
close.addEventListener("click", closeConfirm);

// valid imput form

const formValidate = {
  first: {
    name: "first",
    regex: /^[a-zA-Z]{2,}$/,

    required: true,
    errorCustom: "Veuillez entrer 2 caractères ou plus pour ce champ."
  },
  last: {
    name: "last",

    regex: /^[a-zA-Z]{2,}$/,
    required: true,
    errorCustom: "Veuillez entrer 2 caractères ou plus pour ce champ."
  },
  email: {
    name: "email",

    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
    errorCustom: "Veuillez entrer une adresse mail valide."
  },
  birthdate: {
    name: "birthdate",
    regex: /^[0-9]{4}(-[0-9]{2}){2}$/,
    required: true,
    errorCustom: "Vous devez entrer votre date de naissance."
  },
  quantity: {
    name: "quantity",
    regex: /^[0-9]{1,2}$/,
    required: true,
    errorCustom: "Vous devez entrer un nombre."
  }
};
const validCheckbox = {
  localisation: {
    name: "location",
    error: "Vous devez choisir une option.",
    required: true
  },
  checkbox1: {
    name: "checkbox1",
    error: "Vous devez vérifier que vous acceptez les termes et conditions.",
    required: true
  },
  checkbox2: {
    name: "checkbox2",
    required: false,
  }
}


const form = document.getElementById("reverve");
form.addEventListener("submit",function validate(e) {
  e.preventDefault();
  const inputs = form.getElementsByClassName("text-control");
  let asError = false;
  // chercher les entrées correspondante entre formValidate et les inputs
  for (let i = 0; i< inputs.length; i++) {
    for(const item in formValidate){
     
      if (inputs[i].name === formValidate[item].name){
        const input = inputs[i];

        // tester les inputs avec les regex
        if (!formValidate[item].regex.test(inputs[i].value)) {
          asError = true;

          //si erreur et pas de pError : création d'un paragraphe
          if (input.nextElementSibling === null) {
            let p = document.createElement("p");
            input.parentNode.appendChild(p);
          }
          // erreur personnalisé
          let pError = input.nextElementSibling;
          pError.className = "formError"
          pError.previousElementSibling.classList.add("inputError");
          pError.innerHTML = formValidate[item].errorCustom;

        } else { // si pas d'ereur
          if (input.nextElementSibling === null) {
          } // supression du message d'erreur 
          else if (input.nextElementSibling.tagName === "P"){
            let pError = input.nextElementSibling;
            pError.previousElementSibling.classList.remove("inputError");
            input.parentNode.removeChild(pError);
          }
        }
      }
    };
  };
  validateRadios();
  if (asError || !validateRadios() ) {
    return false
  };

  confirmMessage();
  modalBtnClose.addEventListener("click", closeConfirm);
  
});

function closeConfirm () {
  modalbg.style.display ="none";
  formReverve.style.display = "block";
  sendConfirm.style.display = "none";
  modalBtnClose.removeEventListener("click", closeConfirm);
};

function confirmMessage() {
  formReverve.style.display = "none";
  sendConfirm.style.display = "block";
};

// verification des checkbox et radios
function validateRadios() {
  let formValid = true;
  let inputwarps = document.getElementsByClassName("inputWarp");

  for (let i = 0; i< inputwarps.length; i++) {
    const checkbox = inputwarps[i].getElementsByClassName("checkbox-input");
    let hasInputWarpsValid = false
    // supression des anciens message d'erreurs
    if (inputwarps[i].lastElementChild.tagName === "P") {
      inputwarps[i].removeChild(inputwarps[i].lastElementChild);
    }

    // // chercher les entrées correspondante entre validChecbox et les inputs
    for (let j = 0; j < checkbox.length; j++) {
      for (const item in validCheckbox) {
       // parcours des inputs pour voir si cochée
        if (validCheckbox[item].name === checkbox[j].name && validCheckbox[item].required){
          if (checkbox[j].checked) {
            hasInputWarpsValid = true;
          
          }
          // si erreur création de message personalisé
          if (!hasInputWarpsValid && inputwarps[i].lastElementChild.tagName !== "P") {
            let htmlContent = `<p> ${validCheckbox[item].error}</p>`;
            inputwarps[i].insertAdjacentHTML('beforeend', htmlContent);
            let pError = inputwarps[i].lastElementChild;
            pError.className = "formError";
            pError.innerHTML = formValidate[item].errorCustom;
          }
          // si pas requis 
        } if (validCheckbox[item].name === checkbox[j].name && !validCheckbox[item].required ){
          hasInputWarpsValid = true;
        }

      }
    }
    
    if (!hasInputWarpsValid) {formValid = false};

  }
  return formValid;
}
