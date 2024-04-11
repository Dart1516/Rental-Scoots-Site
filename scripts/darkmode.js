document.addEventListener("DOMContentLoaded", () => {
    const ButtonImage = document.getElementById("dark-mode-button");
    const ButtonImage2 = document.getElementById("dark-mode-button-for-mobile");
    let imagenActual = 1;

    // This will load the "dark mode" if it was selected before
    const darkModeSaved = localStorage.getItem("modo");
    if (darkModeSaved === "dark-mode") {
        document.body.classList.add("dark-mode");
    }

    ButtonImage.addEventListener("click", function () {
        // change the mode
        const modoActual = document.body.classList.toggle("dark-mode");

        // save the mode on the local storage
        localStorage.setItem("modo", modoActual ? "dark-mode" : "");

        // change the button image
        setTimeout(() => {
            if (imagenActual === 1) {
                ButtonImage.src = "images/logos/button-day.webp";
                imagenActual = 2;
            } else {
                ButtonImage.src = "images/logos/button-night.webp";
                imagenActual = 1;
            }
        }, 100); // wait 100 milliseconds before changing the image
    });

    // Event listener for the second button (ButtonImage2)
    ButtonImage2.addEventListener("click", function () {
        // change the mode
        const modoActual = document.body.classList.toggle("dark-mode");

        // save the mode on the local storage
        localStorage.setItem("modo", modoActual ? "dark-mode" : "");

        // change the button image
        setTimeout(() => {
            if (imagenActual === 1) {
                ButtonImage2.src = "images/logos/button-day.webp";
                imagenActual = 2;
            } else {
                ButtonImage2.src = "images/logos/button-night.webp";
                imagenActual = 1;
            }
        }, 100); // wait 100 milliseconds before changing the image
    });
});
