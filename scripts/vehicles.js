const url = 'https://github.com/Dart1516/Rental-Scoots-Site/blob/main/data/maxrentalpricing.json'

async function getData(url){
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}