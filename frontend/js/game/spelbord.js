const cardsContainer = document.querySelector('.grid-container');
const imagesOnCardSelect = document.getElementById('imagesOnCard');

async function fetchAndApplyUserPreferences() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
        console.log('User is not logged in');
        return;
    }

    const payload = parseJwt(jwtToken);
    const userId = Number(payload.sub);

    try {
        const response = await fetch(`http://localhost:8000/api/player/${userId}/preferences`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            }
        });

        if (response.ok) {
            const preferences = await response.json();
            imagesOnCardSelect.value = preferences.preferred_api || "Katten"; // Updated here

            // Check if color values are empty and set them to default if they are
            const defaultColorClosed = "#fffaf0"; // replace with your default color
            const defaultColorFound = "#fc819e"; // replace with your default color
            document.getElementById('kaartKleur').value = preferences.color_closed || defaultColorClosed;
            document.getElementById('gevondenKleur').value = preferences.color_found || defaultColorFound;

            updateCardColors();
            generateBoard();
        } else {
            console.error('Error fetching user preferences');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchAndApplyUserPreferences();
});

function generateBoard() {
    const size = boardSizeSelector.value;
    cardsContainer.innerHTML = '';
    cardsContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const numCards = size * size;
    let fetchImages;

    switch (imagesOnCardSelect.value) {
        case "Katten":
            fetchImages = fetchCatImages;
            break;
        case "Honden":
            fetchImages = fetchDogImages;
            break;
        default:
            fetchImages = fetchCatImages;
    }

    localStorage.setItem('selectedAPI', imagesOnCardSelect.value);

    fetchImages(numCards / 2).then(images => {
        const cardValues = generateCardValues(numCards);
        const paired = generatePairedArray(images, cardValues);
        const karakter = karakterSelect.value;

        paired.forEach(pair => {
            const card = document.createElement('div');
            card.classList.add('closed');
            card.dataset.value = pair.value;
            card.innerHTML = `
                <span class="icon">${karakter}</span>
                <img class="image" src="${pair.imageUrl}" alt="Cat Image">
            `;
            card.addEventListener('click', flipCard);
            cardsContainer.appendChild(card);
        });

        updateCardColors();
        updateCardIcons();
    });
}

function fetchCatImages(numImages) {
    const fetchPromises = [];
    for (let i = 0; i < numImages; i++) {
        fetchPromises.push(fetch("https://cataas.com/cat?timestamp=" + new Date().getTime())
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
        );
    }
    return Promise.all(fetchPromises);
}

function fetchDogImages(numImages) {
    const fetchPromises = [];
    for (let i = 0; i < numImages; i++) {
        fetchPromises.push(
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => fetch(data.message))
                .then(response => response.blob())
                .then(blob => URL.createObjectURL(blob))
        );
    }
    return Promise.all(fetchPromises);
}

function generateCardValues(numCards) {
    const numPairs = numCards / 2;
    const values = [];
    for (let i = 0; i < numPairs; i++) {
        const value = String.fromCharCode(65 + i);
        values.push(value, value);
    }
    return values;
}

function generatePairedArray(images, cardValues) {
    let pairedArray = [];
    for (let i = 0; i < images.length; i++) {
        pairedArray.push(
            { imageUrl: images[i], value: cardValues[i * 2] },
            { imageUrl: images[i], value: cardValues[i * 2 + 1] }
        );
    }
    console.log(pairedArray)
    return shuffle(pairedArray);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
