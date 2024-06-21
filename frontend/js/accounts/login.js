document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = form.email.value;
        const username = form.uname.value;
        const password = form.psw.value;

        const data = { email, username, password };

        console.log('Verzenden van inloggegevens:', data);

        try {
            const response = await fetch('http://localhost:8000/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                const responseData = await response.json();
                const token = responseData.token;

                localStorage.setItem('jwtToken', token);
                localStorage.setItem('username', username);

                alert('Login succesvol!');

                window.location.href="index.html";
            } else {
                const errorData = await response.json();
                alert(`Er is een fout opgetreden bij het inloggen: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Er is een netwerkfout opgetreden', error);
            alert('Er is een netwerkfout opgetreden');
        }
    });
});