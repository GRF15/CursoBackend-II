document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registerMessage = document.getElementById('registerMessage');
    const loginMessage = document.getElementById('loginMessage');

    // Handle registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/sessions/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                registerMessage.textContent = 'Registration successful! You can now log in.';
                registerMessage.style.color = 'green';
                registerForm.reset();
            } else {
                throw new Error(result.error || 'Registration failed');
            }
        } catch (error) {
            registerMessage.textContent = error.message;
            registerMessage.style.color = 'red';
        }
    });

    // Handle login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/sessions/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.token) {
                // Store the token and redirect to the profile page
                localStorage.setItem('jwtToken', result.token);
                window.location.href = '/profile.html'; 
            } else {
                throw new Error(result.error || 'Login failed');
            }
        } catch (error) {
            loginMessage.textContent = error.message;
            loginMessage.style.color = 'red';
        }
    });
});
