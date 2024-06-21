document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = form.email.value;
        const username = form.uname.value;
        const password = form.psw.value;

        const data = { email, username, password };

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 201) {
                alert('Registratie succesvol!');
                window.location.href="inloggen.html";
            } else {
                const errorData = await response.json();
                alert(`Er is een fout opgetreden bij het registreren: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Er is een netwerkfout opgetreden', error);
            alert('Er is een netwerkfout opgetreden');
        }
    });
});