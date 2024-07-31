document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById('logo-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    }, 3000); // Delay of 3 seconds

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            alert('Login successful!');
            // Redirect or show a logged-in screen
        } else {
            alert('No such user found. Please sign up.');
        }
    });

    document.querySelector('.signup-btn').addEventListener('click', () => {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('signup-screen').classList.remove('hidden');
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const age = document.getElementById('signup-age').value;
        const mobile = document.getElementById('signup-mobile').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, mobile, username, password })
        });

        const result = await response.json();
        if (result.success) {
            alert('Sign up successful! You can now log in.');
            document.getElementById('signup-screen').classList.add('hidden');
            document.getElementById('login-screen').classList.remove('hidden');
        } else {
            alert('Sign up failed. Please try again.');
        }
    });
});
