const url5 = 'https://raw.githubusercontent.com/Dart1516/Rental-Scoots-Site/main/data/maxrentalpricing.json';

async function getData(url5) {
    try {
        const response = await fetch(url5);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    // Selecting the first option by default
    const defaultOption = document.querySelector('#vehicle-description option:first-child');
    defaultOption.selected = true;

    // Triggering the 'change' event manually to display vehicle info
    const changeEvent = new Event('change');
    document.getElementById('vehicle-description').dispatchEvent(changeEvent);
});

document.getElementById('vehicle-description').addEventListener('change', async function() {
    const selectedVehicleId = this.value;
    if (selectedVehicleId) {
        const data = await getData(url);
        const selectedVehicle = data.rentalType[selectedVehicleId];
        if (selectedVehicle) {
            const colorKey = Object.keys(selectedVehicle.color)[0]; // Assuming only one color
            const vehicleInfo = document.getElementById('vehicle-info');
            vehicleInfo.innerHTML = `
                <p>Description: ${selectedVehicle.description}</p>
                <p>Max Persons: ${selectedVehicle.maxPersons}</p>
                <p id="reservationPrice">Reservation Price: $${selectedVehicle.reservationPrice.halfDay}</p>
                <p>Half Day Walk-in Price: $${selectedVehicle.walkInPrice.halfDay}</p>
                <img src="${selectedVehicle.color[colorKey].imageURL}" alt="${selectedVehicleId}">
            `;
            // Event listener for reservation type selection
            document.querySelectorAll('input[name="reservation"]').forEach((radio) => {
                radio.addEventListener('change', () => {
                    const priceElement = document.getElementById('reservationPrice');
                    if (radio.value === 'halfDay') {
                        priceElement.textContent = `Reservation Price: $${selectedVehicle.reservationPrice.halfDay}`;
                    } else {
                        priceElement.textContent = `Reservation Price: $${selectedVehicle.reservationPrice.fullDay}`;
                    }
                });
            });
            // Event listener for quantity of days selection
            document.getElementById('quantityDays').addEventListener('change', () => {
                const quantityDays = document.getElementById('quantityDays').value;
                const priceElement = document.getElementById('reservationPrice');
                if (quantityDays) {
                    const reservationPrice = radio.value === 'halfDay' ? selectedVehicle.reservationPrice.halfDay : selectedVehicle.reservationPrice.fullDay;
                    const totalPrice = reservationPrice * parseInt(quantityDays);
                    priceElement.textContent = `Reservation Price: $${totalPrice}`;
                }
            });
        } else {
            console.error('Vehicle data not found.');
        }
    }
});
