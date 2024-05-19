window.addEventListener('load', function() {
    var welcomeSound = document.getElementById('welcome-sound');
    welcomeSound.play();
});

// Al cargar la página, mostrar la capa de carga y ocultar el contenido principal
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-overlay').style.display = 'flex';

    // Agregar evento al botón de iniciar
    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('loading-overlay').style.display = 'none';
    });
});