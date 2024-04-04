document.addEventListener("DOMContentLoaded", () => {
  const ButtonImage = document.getElementById("dark-mode-button");
  let imagenActual = 1;

  // This will load tje "dark mode if was selected before"
  const darkModeSaved = localStorage.getItem("modo");
  if (darkModeSaved === "dark-mode") {
      document.body.classList.add("dark-mode");
  }

  ButtonImage.addEventListener("click", function () {
      // change the mode
      const modoActual = document.body.classList.toggle("dark-mode");

      // save the mode pm the local storage
      localStorage.setItem("modo", modoActual ? "dark-mode" : "");
  });

  ButtonImage.addEventListener("click", () => {
      
      setTimeout(() => {
          if (imagenActual === 1) {
              ButtonImage.src = "images/logos/button-day.webp";
              imagenActual = 2;
          } else {
              ButtonImage.src = "images/logos/button-night.webp";
              imagenActual = 1;
          }
      }, 100); // wait 100 mili-seconds before change the image
  });
});