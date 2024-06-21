document.addEventListener('DOMContentLoaded', () => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken && !window.location.href.endsWith('inloggen.html')) {
        window.location.href = 'inloggen.html';
    }
});