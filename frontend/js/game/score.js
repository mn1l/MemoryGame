//TODO Ervoor zorgen dat de scores daadwerkelijk naar de database gezet worden + updaten van de gemiddelde speler z'n score

function calculateGameScore(elapsedTimeInSeconds) {
    return elapsedTimeInSeconds;
}

function saveGameData(score) {
    const jwtToken = localStorage.getItem('jwtToken');
    const payload = parseJwt(jwtToken);

    const gameData = {
        id: payload.sub,
        score: score,
        api: localStorage.getItem('selectedAPI')
    };

    document.getElementById('imagesOnCard').value

    fetch('http://localhost:8000/game/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(gameData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Fetch scores from the backend
fetch('http://localhost:8000/scores', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Calculate the average score
        let totalScore = 0;
        data.forEach(game => {
            totalScore += game.score;
        });
        let averageScore = totalScore / data.length;

        // Convert the average score to MM:SS format
        let minutes = Math.floor(averageScore / 60);
        let seconds = Math.floor(averageScore % 60);
        let formattedScore = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update the HTML element with the average score
        document.querySelector('#averageScore').textContent = `${formattedScore}`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });