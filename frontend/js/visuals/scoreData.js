fetch('http://localhost:8000/scores')
    .then(response => response.json())
    .then(data => {
        const scoreList = document.getElementById('scoreList');
        const scoreMap = new Map();

        data.forEach(item => {
            if (!scoreMap.has(item.username) || item.score > scoreMap.get(item.username)) {
                scoreMap.set(item.username, item.score);
            }
        });

        const sortedScores = Array.from(scoreMap).sort((a, b) => a[1] - b[1]);
        const topScores = sortedScores.slice(0, 5);

        while (scoreList.firstChild) {
            scoreList.removeChild(scoreList.firstChild);
        }

        topScores.forEach(([username, score]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${username}: ${score}`;
            scoreList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));