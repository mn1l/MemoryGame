document.addEventListener('DOMContentLoaded', async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
        return;
    }

    const payload = parseJwt(jwtToken);
    const userId = Number(payload.sub);

    try {
        const response = await fetch(`http://localhost:8000/api/player/${userId}/preferences`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

        if (response.ok) {
            const preferences = await response.json();

            // Check if color values are empty and set them to default if they are
            const defaultColorClosed = "#fffaf0"; // replace with your default color
            const defaultColorFound = "#fc819e"; // replace with your default color
            document.getElementById('kaartKleur').value = preferences.color_closed || defaultColorClosed;
            document.getElementById('gevondenKleur').value = preferences.color_found || defaultColorFound;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.querySelector('.savebutton').addEventListener('click', async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log(jwtToken);
    if (!jwtToken) {
        alert('Log in om de aanpassingen op te slaan');
        return;
    }

    const payload = parseJwt(jwtToken);
    const userId = Number(payload.sub);

    const settings = {
        api: document.getElementById('imagesOnCard').value,
        color_closed: document.getElementById('kaartKleur').value,
        color_found: document.getElementById('gevondenKleur').value
    };

    const oldEmail = document.getElementById('currentEmail').value;
    const newEmail = document.getElementById('newEmail').value;

    try {
        const response = await fetch(`http://localhost:8000/api/player/${userId}/preferences`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(settings)
        });

        if (response.ok) {
            alert('Instellingen succesvol opgeslagen');
        } else {
            alert('Fout bij opslaan van instellingen');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Er is een fout opgetreden bij het opslaan van de instellingen');
    }

    if (newEmail && oldEmail) {
        try {
            const response = await fetch(`http://localhost:8000/api/player/${userId}/email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({email: newEmail})
            });

            if (response.ok) {
                alert('E-mail succesvol bijgewerkt');
            } else {
                alert('Fout bij updaten van e-mail');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Er is een fout opgetreden bij het updaten van de e-mail');
        }
    }
});