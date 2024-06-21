document.addEventListener("DOMContentLoaded", () => {
    showConfetti();

    window.onload = function() {
        const username = localStorage.getItem('username');
        if (username) {
            document.getElementById('usernameDisplay').textContent = `Welkom ${username}!`;
        }
    }
});