const url = 'https://raw.githubusercontent.com/Dart1516/Rental-Scoots-Site/main/data/maxrentalpricing.json';

async function getData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function displayRentalsList() {
    getData(url).then(data => {
        const rentalTypes = Object.values(data.rentalType);

        rentalTypes.forEach(rental => {
            const mainDiv = document.getElementById('mainDiv');

            const section = document.createElement('section');
            section.classList.add('rental-item');

            const vehicleName = document.createElement('h2');
            vehicleName.textContent = rental.name;
            section.appendChild(vehicleName);

            const hr = document.createElement('hr');
            section.appendChild(hr);

            const image = document.createElement('img');
            // Seleccionar la primera imagen del modelo
            const colorKeys = Object.keys(rental.color);
            const firstColorKey = colorKeys[0];
            image.src = rental.color[firstColorKey].imageURL;
            const colorNames = Object.keys(rental.color).join(', ');
            image.alt = `Vehicle Image - Available Colors: ${colorNames}`;
            image.classList.add('vehicle-image');
            image.loading = 'lazy';
            section.appendChild(image);

            const colorsBox = document.createElement('div');
            colorsBox.classList.add('colors-box');
            const colorsTitle = document.createElement('h3');
            colorsTitle.textContent = 'Available Colors';
            colorsBox.appendChild(colorsTitle);
            Object.entries(rental.color).forEach(([colorName, colorData]) => {
                const colorSquare = document.createElement('div');
                colorSquare.classList.add('color-square');
                colorSquare.style.backgroundColor = colorData.colorHex;
                colorSquare.addEventListener('click', () => {
                    image.src = colorData.imageURL;
                });
                colorSquare.addEventListener('mouseenter', () => {
                    colorSquare.style.opacity = '0.8';
                    colorSquare.style.cursor = 'pointer';
                });
                colorSquare.addEventListener('mouseleave', () => {
                    colorSquare.style.opacity = '1';
                });
                colorsBox.appendChild(colorSquare);
            });
            section.appendChild(colorsBox);

            const quantityPeople = document.createElement('h4');
            quantityPeople.classList.add('quantity-people');
            quantityPeople.textContent = `Max Persons: ${rental.maxPersons}`;
            section.appendChild(quantityPeople);

            const walkInPrice = document.createElement('div');
            walkInPrice.classList.add('walkin-price');
            const walkInTitle = document.createElement('h3');
            walkInTitle.textContent = 'Walk-in Price';
            walkInPrice.appendChild(walkInTitle);
            Object.entries(rental.color[firstColorKey].reservationPrice).forEach(([period, priceObj]) => {
                const priceParagraph = document.createElement('p');
                priceParagraph.classList.add(period.toLowerCase());
                priceParagraph.textContent = `${period}: $${priceObj.price}`;
                walkInPrice.appendChild(priceParagraph);
            });
            section.appendChild(walkInPrice);

            const reservationPrice = document.createElement('div');
            reservationPrice.classList.add('reservation-price');
            const reservationTitle = document.createElement('h3');
            reservationTitle.textContent = 'Reservation Price';
            reservationPrice.appendChild(reservationTitle);
            Object.entries(rental.color[firstColorKey].reservationPrice).forEach(([period, priceObj]) => {
                const priceParagraph = document.createElement('p');
                priceParagraph.classList.add(period.toLowerCase());
                priceParagraph.textContent = `${period}: $${priceObj.price}`;
                reservationPrice.appendChild(priceParagraph);
            });
            section.appendChild(reservationPrice);

            const reservationButton = document.createElement('button');
            reservationButton.classList.add('vehicleId');
            reservationButton.textContent = 'Make a Reservation';
            reservationButton.addEventListener('click', () => {
                window.location.href = 'reservations.html';
            });
            section.appendChild(reservationButton);

            mainDiv.appendChild(section);
            
        });
    });
}

displayRentalsList();
