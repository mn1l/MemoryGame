/**
 * Updating van de kaart kleuren en icoontjes
 */

const boardSizeSelector = document.getElementById('boardSize');
const karakterSelect = document.getElementById('characterOnCard');
const kaartKleurInput = document.getElementById('kaartKleur');
const openKleurInput = document.getElementById('openKleur');
const gevondenKleurInput = document.getElementById('gevondenKleur');
const imageSelect = document.getElementById('imagesOnCard')

kaartKleurInput.addEventListener('input', updateCardColors);
openKleurInput.addEventListener('input', updateCardColors);
gevondenKleurInput.addEventListener('input', updateCardColors);
karakterSelect.addEventListener('change', updateCardIcons);
boardSizeSelector.addEventListener('change', resetGame);
imageSelect.addEventListener('change', resetGame);


function updateCardColors() {
    const kaartKleur = kaartKleurInput.value;
    const openKleur = openKleurInput.value;
    const gevondenKleur = gevondenKleurInput.value;

    document.querySelectorAll('.grid-container > div').forEach(card => {
        if (card.classList.contains('found')) {
            card.style.backgroundColor = gevondenKleur;
        } else if (card.classList.contains('opened')) {
            card.style.backgroundColor = openKleur;
        } else {
            card.style.backgroundColor = kaartKleur;
        }
    });
}


function updateCardIcons() {
    const karakter = karakterSelect.value;
    document.querySelectorAll('.grid-container > div').forEach(card => {
        card.querySelector('.icon').textContent = karakter;
    });
}