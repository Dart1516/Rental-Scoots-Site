
document.addEventListener('DOMContentLoaded', function() {
    const hamButton = document.getElementById('mobile-menu');
//	const hamButton = document.querySelector('#menu'); sirve así como la primera tambien //
    const navigation = document.querySelector('.navigation-menu-bar');

	
    // Función para alternar la clase 'open' en el menú
    hamButton.addEventListener('click', () => {
		navigation.classList.toggle('open');
		hamButton.classList.toggle('open');
	});
    // Event listener para el botón de menú
    hamButton.addEventListener('click', function() { toggleMenu(); });

    // Event listener para el documento que cierra el menú cuando se hace clic fuera de él
    document.addEventListener('click', function(event) {
        const target = event.target;
        const isMenuButton = target === hamButton || hamButton.contains(target);
        const isNavigation = target === navigation || navigation.contains(target);

        if (!isMenuButton && !isNavigation) {
            navigation.classList.remove('open');
        }
    });
});

