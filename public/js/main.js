document.addEventListener('DOMContentLoaded', () => {

    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {

            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    window.location.href = '/';
                } else {
                    console.error('Failed to logout');
                }
            })
            .catch((error) => {
                console.error('error during logout', error);
            });
        });
    }
});