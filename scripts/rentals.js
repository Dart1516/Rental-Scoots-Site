const url4 = 'https://raw.githubusercontent.com/Dart1516/Rental-Scoots-Site/main/data/maxrentalpricing.json';

async function getData(url4) {
    try {
        const response = await fetch(url4);
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
            image.src = rental.color.color1.imageURL; // Usar la primera imagen disponible como imagen del vehículo
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
                colorSquare.addEventListener('mouseover', () => {
                    image.src = colorData.imageURL;
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
            Object.entries(rental.color.color1['walk-in-Price']).forEach(([period, price]) => {
                const priceParagraph = document.createElement('p');
                priceParagraph.classList.add(period.toLowerCase());
                priceParagraph.textContent = `${period} Price: $${price}`;
                walkInPrice.appendChild(priceParagraph);
            });
            section.appendChild(walkInPrice);

            const reservationPrice = document.createElement('div');
            reservationPrice.classList.add('reservation-price');
            const reservationTitle = document.createElement('h3');
            reservationTitle.textContent = 'Reservation Price';
            reservationPrice.appendChild(reservationTitle);
            Object.entries(rental.color.color1.reservationPrice).forEach(([period, price]) => {
                const priceParagraph = document.createElement('p');
                priceParagraph.classList.add(period.toLowerCase());
                priceParagraph.textContent = `${period} Price: $${price}`;
                reservationPrice.appendChild(priceParagraph);
            });
            section.appendChild(reservationPrice);

            const reservationButton = document.createElement('button');
            reservationButton.classList.add('vehicleId');
            reservationButton.textContent = 'Make a Reservation';
            reservationButton.href = 'reservations.html'; // Agregar el enlace correcto a la página de reservas
            section.appendChild(reservationButton);

            mainDiv.appendChild(section);
            
        });
    });
}

displayRentalsList();
