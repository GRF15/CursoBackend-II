document.addEventListener('DOMContentLoaded', async () => {
    const profileData = document.getElementById('profileData');
    const logoutButton = document.getElementById('logoutButton');
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        // If no token is found, redirect to the login page
        window.location.href = '/index.html';
        return;
    }

    try {
        // Fetch user data from the /current endpoint
        const response = await fetch('/api/sessions/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            // Display user information
            profileData.innerHTML = `
                <p><strong>First Name:</strong> ${user.first_name}</p>
                <p><strong>Last Name:</strong> ${user.last_name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Role:</strong> ${user.role}</p>
            `;
        } else {
            // If the token is invalid, clear it and redirect to login
            localStorage.removeItem('jwtToken');
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        // Redirect to login on any error
        window.location.href = '/index.html';
    }

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('jwtToken');
        window.location.href = '/index.html';
    });
});
