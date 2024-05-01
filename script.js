document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const loggedInUser = document.getElementById('loggedInUser');

    // Función para mostrar u ocultar botones según el estado de autenticación
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

    // Inicializar Netlify Identity
    const netlifyIdentity = window.netlifyIdentity;
    netlifyIdentity.init();

    // Manejar eventos al hacer clic en "Iniciar Sesión"
    loginButton.addEventListener('click', () => {
        netlifyIdentity.open();
    });

    // Manejar eventos al hacer clic en "Registrarse"
    registerButton.addEventListener('click', () => {
        netlifyIdentity.open('signup');
    });

    // Manejar eventos al iniciar sesión
    netlifyIdentity.on('login', (user) => {
        toggleAuthButtons(user);
    });

    // Manejar eventos al cerrar sesión
    netlifyIdentity.on('logout', () => {
        toggleAuthButtons(null);
    });

    // Mostrar nombre de usuario si ya está autenticado al cargar la página
    const currentUser = netlifyIdentity.currentUser();
    toggleAuthButtons(currentUser);

    // Redirigir al usuario a la página de inicio de sesión al hacer clic en "¡JUGAR!"
    playButton.addEventListener('click', () => {
        const user = netlifyIdentity.currentUser();
        if (!user) {
            alert('Debes iniciar sesión para jugar.');
            netlifyIdentity.open();
        } else {
            // Aquí podrías redirigir al usuario a la página del juego
            alert(`¡Hola, ${user.user_metadata.full_name || user.email}! Preparándote para jugar...`);
        }
    });
});
