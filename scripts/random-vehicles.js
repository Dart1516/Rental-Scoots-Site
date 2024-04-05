const url = 'https://raw.githubusercontent.com/Dart1516/Rental-Scoots-Site/main/data/maxrentalpricing.json';

async function getData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function getRandomVehicle(data) {
    const rentalTypes = Object.keys(data.rentalType);
    const randomType = rentalTypes[Math.floor(Math.random() * rentalTypes.length)];
    const vehicle = data.rentalType[randomType];
    const colors = Object.keys(vehicle.color);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const selectedColor = vehicle.color[randomColor];
    const description = vehicle.description; 
    const imageURL = selectedColor.imageURL; 
    return {
        name: vehicle.name,
        description: description,
        imageURL: imageURL
    };
}

async function displayRandomVehicle() {
    const jsonData = await getData(url);
    const randomVehicle = getRandomVehicle(jsonData);
    document.getElementById('vehicle-name').textContent = randomVehicle.name;
    document.getElementById('vehicle-image').src = randomVehicle.imageURL;
    document.getElementById('vehicle-description').textContent = randomVehicle.description;
}

displayRandomVehicle();
