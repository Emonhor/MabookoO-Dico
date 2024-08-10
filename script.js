// Variable pour suivre l'étape actuelle
let currentStep = 1;

/**
 * Affiche l'étape spécifiée et cache les autres.
 * @param {number} step - Numéro de l'étape à afficher.
 */
function showStep(step) {
    // Cache toutes les étapes
    document.querySelectorAll('.step').forEach(stepElement => {
        stepElement.style.display = 'none';
    });
    // Affiche l'étape spécifiée
    document.getElementById(`step${step}`).style.display = 'block';
    // Met à jour les boutons
    updateButtons(step);
}

/**
 * Affiche le bouton "Suivant" ou "Soumettre" selon l'étape.
 * @param {number} step - Numéro de l'étape actuelle.
 */
function updateButtons(step) {
    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'inline';
    document.getElementById('nextBtn').style.display = step === 4 ? 'none' : 'inline';
    document.getElementById('submitBtn').style.display = step === 4 ? 'inline' : 'none';
}

/**
 * Passe à l'étape suivante après validation de l'étape actuelle.
 */
function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    }
}

/**
 * Retourne à l'étape précédente.
 */
function prevStep() {
    currentStep--;
    showStep(currentStep);
}

/**
 * Valide les champs de l'étape actuelle.
 * @param {number} step - Numéro de l'étape actuelle.
 * @returns {boolean} - True si l'étape est valide, sinon False.
 */
function validateStep(step) {
    let valid = true;
    const currentStepFields = document.querySelectorAll(`#step${step} .form-control`);

    currentStepFields.forEach(field => {
        if (field.value.trim() === '') {
            field.classList.add('is-invalid');
            valid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    return valid;
}

/**
 * Génère un résumé des informations remplies.
 */
function generateSummary() {
    let summaryList = document.getElementById('summaryList');
    summaryList.innerHTML = `
        <li><strong>Nom(s):</strong> ${document.getElementById('lastName').value}</li>
        <li><strong>Prénom(s):</strong> ${document.getElementById('firstName').value}</li>
        <li><strong>Nom d'utilisateur:</strong> ${document.getElementById('username').value}</li>
        <li><strong>Créer un mot de passe:</strong> ********</li> <!-- Ne pas afficher le mot de passe -->
        <li><strong>Profession:</strong> ${document.getElementById('profession').value}</li>
        <li><strong>Niveau:</strong> ${document.getElementById('level').value}</li>
        <li><strong>Numéro de téléphone:</strong> ${document.getElementById('phone').value}</li>
        <li><strong>Adresse:</strong> ${document.getElementById('address').value}</li>
    `;
}

/**
 * Soumet le formulaire et affiche le résumé des informations.
 */
function submitForm() {
    if (validateStep(currentStep)) {
        generateSummary();
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
    }
}

// Afficher la première étape au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
});
