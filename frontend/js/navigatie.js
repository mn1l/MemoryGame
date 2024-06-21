document.addEventListener('DOMContentLoaded', () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');
    const settingsButton = document.getElementById('settings');
    const logoutButton = document.getElementById('logout');
    const gameboardButton = document.getElementById('gameboard');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'inloggen.html';
        });
    }

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = 'registreren.html';
        });
    }

    if (settingsButton) {
        settingsButton.addEventListener('click', () => {
            window.location.href = 'instellingen.html';
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('jwtToken');
            window.location.href = 'inloggen.html';
        });
    }

    if (gameboardButton) {
        gameboardButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    updateButtonVisibility(jwtToken);

    if (jwtToken) {
        const jwtPayload = parseJwt(jwtToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > jwtPayload.exp) {
            alert('Your session has expired. Please log in again.');
            localStorage.removeItem('jwtToken');
            updateButtonVisibility(null);
            window.location.href = 'inloggen.html';
        }
    }
});

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function updateButtonVisibility(jwtToken) {
    const navuitlog = document.getElementById('loggedout');
    const navinlog = document.getElementById('loggedin');

    if (jwtToken) {
        navuitlog.style.display = 'none';
        navinlog.style.display = 'block';
    } else {
        navuitlog.style.display = 'block';
        navinlog.style.display = 'none';
    }
}