document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const loggedInUser = document.getElementById('loggedInUser');

    // Mostrar u ocultar botones según el estado de autenticación
    function toggleAuthButtons(user) {
        if (user) {
            loggedInUser.textContent = user.user_metadata.full_name || user.email;
            loggedInUser.style.display = 'inline';
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
        } else {
            loggedInUser.style.display = 'none';
            loginButton.style.display = 'inline';
            registerButton.style.display = 'inline';
        }
    }

    // Iniciar sesión al hacer clic en "Iniciar Sesión"
    loginButton.addEventListener('click', () => {
        netlifyIdentity.open();
    });

    // Registrarse al hacer clic en "Registrarse"
    registerButton.addEventListener('click', () => {
        netlifyIdentity.open('signup');
    });

    // Mostrar nombre de usuario si está autenticado
    netlifyIdentity.on('login', (user) => {
        toggleAuthButtons(user);
    });

    // Ocultar nombre de usuario al cerrar sesión
    netlifyIdentity.on('logout', () => {
        toggleAuthButtons(null);
    });

    // Mostrar nombre de usuario si ya está autenticado al cargar la página
    const currentUser = netlifyIdentity.currentUser();
    toggleAuthButtons(currentUser);

    // Redirigir al usuario a la página de inicio de sesión al hacer clic en "¡JUGAR!"
    playButton.addEventListener('click', () => {
        if (!currentUser) {
            alert('Debes iniciar sesión para jugar.');
            netlifyIdentity.open();
        } else {
            // Aquí podrías redirigir al usuario a la página del juego
            alert(`¡Hola, ${currentUser.user_metadata.full_name || currentUser.email}! Preparándote para jugar...`);
        }
    });
});
