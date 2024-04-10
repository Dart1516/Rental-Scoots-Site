const url = 'https://raw.githubusercontent.com/Dart1516/Rental-Scoots-Site/main/data/maxrentalpricing.json';

async function getData(url) {
    try {
        const response = await fetch(url);
        return await response.json(); 
    } catch (error) {
        console.error('Error fetching JSON:', error); 
    }
}

// for doing the first vehicle appear
document.addEventListener("DOMContentLoaded", async function() {    
    // Select the first vehicle option by default
    const firstVehicleOption = document.querySelector('#vehicle-description option:nth-child(2)');
    firstVehicleOption.selected = true;
    
    // Dispatch a 'change' event to display information of the default selected vehicle
    const changeEvent = new Event('change');
    document.getElementById('vehicle-description').dispatchEvent(changeEvent);
});

// Event listener for the 'change' event of the vehicle description dropdown
document.getElementById('vehicle-description').addEventListener('change', async function() {
    // Get the selected vehicle ID
    const selectedVehicleId = this.value;
    if (selectedVehicleId) {
        const data = await getData(url);
        const selectedVehicle = data.rentalType[selectedVehicleId];
        if (selectedVehicle) {
            // Extract color key
            const colorKey = Object.keys(selectedVehicle.color)[0];
            // Display vehicle information
            const vehicleInfo = document.getElementById('vehicle-info');
            vehicleInfo.innerHTML = `
                <img src="${selectedVehicle.color[colorKey].imageURL}" alt="${selectedVehicleId}">
                <p>Description: ${selectedVehicle.description}</p>
                <div class="parrafos">
                <p>Max Persons: ${selectedVehicle.maxPersons}</p>
                <p id="reservationPrice">Reservation Price: $${selectedVehicle.reservationPrice.halfDay}</p>
                <div/>
            `;
            // Event listener for reservation type selection
            document.querySelectorAll('input[name="reservation"]').forEach((radio) => {
                radio.addEventListener('change', () => {
                    const priceElement = document.getElementById('reservationPrice');
                    // Update reservation price based on selected reservation type
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
                const reservationType = document.querySelector('input[name="reservation"]:checked').value;
                const priceElement = document.getElementById('reservationPrice');
                if (quantityDays && reservationType) {
                    // Calculate total price based on reservation type and quantity of days
                    const reservationPrice = reservationType === 'halfDay' ? selectedVehicle.reservationPrice.halfDay : selectedVehicle.reservationPrice.fullDay;
                    const totalPrice = reservationPrice * parseInt(quantityDays);
                    priceElement.textContent = `Reservation Price: $${totalPrice}`;
                }
            });
        } else {
            console.error('Vehicle data not found.');
        }
    }
});
