
const currentTemp = document.querySelector('#current-temp');
const todayWeatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');
const weatherDetails = document.querySelector('#weather-details');
const weatherTime = document.querySelector('#weather-time');
const weatherLocation = document.querySelector('#weather-location');
const highTemperatureMessage = document.querySelector('.high-temperature-message');

const url1 = 'https://api.openweathermap.org/data/2.5/weather?lat=20.51&lon=-87&appid=6286d02d7f58f621f0abb16f7ade7355&units=metric';

async function apiFetch() {
    try {
        const response = await fetch(url1);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
            displayMaxTemperature(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
    todayWeatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    todayWeatherIcon.setAttribute('alt', data.weather[0].description);
    weatherDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    weatherDetails.innerHTML = `Chance of precipitation: ${data.clouds.all}%<br>Humidity: ${data.main.humidity}%<br>Wind: ${data.wind.speed} km/h <br>`;
    const date = new Date(data.dt * 1000);
    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
    weatherTime.textContent = date.toLocaleString('en-US', options);
    weatherLocation.textContent = data.name;
}

function displayMaxTemperature(data) {
    const maxTemp = data.main.temp_max.toFixed(0);
    highTemperatureMessage.innerHTML = `Max Temperature Today: ${maxTemp}&deg;C <button onclick="closeMessage()">X</button>`;
}

function closeMessage() {
    highTemperatureMessage.style.display = 'none';
}
/*end of get today weather*/
/*start of get forecast weather*/

const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=20.51&lon=-86.94&appid=6286d02d7f58f621f0abb16f7ade7355&units=metric';

async function apiForecastFetch() {
  try {
      const response = await fetch(url2);
      if (response.ok) {
          const data = await response.json();
          displayForecastResults(data);
      } else {
          throw Error(await response.text());
      }
  } catch (error) {
      console.log(error);
  }
}

function displayForecastResults(data) {
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Obtener la fecha de mañana
    
    for (let forecastDay = 0; forecastDay < 3; forecastDay++) {
        const dayData = data.list.filter(item => {
            const itemDate = new Date(item.dt * 1000);
            return (
                itemDate.getHours() === 15 && // Verificar si es a las 3 de la tarde
                itemDate.getDate() === (tomorrow.getDate() + forecastDay) // Verificar si es mañana o los siguientes días
            );
        });
  
        if (dayData.length === 0) continue; // Si no hay datos para este día y hora, pasar al siguiente día
  
        let maxTemp = -Infinity; 
        let minTemp = Infinity;
        let weatherIcon = ''; 
  
        // Calcula las temperaturas máximas y mínimas para el día
        dayData.forEach(item => {
            maxTemp = Math.max(maxTemp, item.main.temp_max);
            minTemp = Math.min(minTemp, item.main.temp_min);
            weatherIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        });
  
        // Obtiene la fecha para el primer elemento de dayData
        const dateObj = new Date(dayData[0].dt * 1000);  
  
        // Actualiza el HTML con las temperaturas máximas y mínimas y el icono del clima
        const currentDayElement = document.getElementById(`day${forecastDay + 1}`);
        const dayOfWeekNumber = dateObj.getDay(); // Obtiene el día de la semana como número
        currentDayElement.querySelector('div').textContent = daysOfWeek[dayOfWeekNumber]; // Actualiza el nombre del día
        currentDayElement.querySelector('#day' + (forecastDay + 1) + '-max-temp').textContent = maxTemp.toFixed(0); // Actualiza la temperatura máxima
        currentDayElement.querySelector('#img_' + (forecastDay + 1)).setAttribute('src', weatherIcon); // Actualiza el icono del clima
    }
}



apiForecastFetch();
/*end of get forecast weather*/