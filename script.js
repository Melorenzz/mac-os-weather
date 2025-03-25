const loader = document.getElementById("loader");

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8593a7859d86c04e8e28cb8c05cb62cc'
const units = 'metric'
const userCity = document.getElementById('userCity');

let q = userCity.value;
let url = `${baseUrl}?q=${q}&apikey=${apiKey}&units=${units}`


userCity.addEventListener('change', () => {
    q = userCity.value;
    url = `${baseUrl}?q=${q}&apikey=${apiKey}&units=${units}`
    getWeatherData()
})

const getUserCity = () => {
    sendRequest('GET', 'https://ipinfo.io/json')
        .then(data => {
            console.log(data.city)
            q = data.city
            url = `${baseUrl}?q=${q}&apikey=${apiKey}&units=${units}`
            getWeatherData()
        })
}
getUserCity()

function sendRequest (method, url, body = {})  {
    return fetch(url, {
        method: method
    })
        .then(res => {return res.json()})
}




const getWeatherData = () => {
    sendRequest('GET', url)
        .then(data => {
            console.log(data)
            document.getElementById('city').innerText = q;
            document.querySelectorAll('.temperature').forEach((item) => {
                item.innerText = data.main.temp + '°';
            })
            const icon = data.weather[0].icon; // Иконка погоды
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('weatherIcon').innerHTML = ` <img src=${iconUrl}> `;
            document.getElementById('userLocationMap').innerHTML = `
                <div style="width: 100%; height: 100%"><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${q}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/collections/drones/">gps drone</a></iframe></div>
            `
            setBackground(data.weather[0].description);
            console.log(data.weather[0].description)
        })
}
getWeatherData()

function setBackground(description){
    switch (description){
        case 'scattered clouds':
            document.getElementById('bgWeather').style.backgroundImage = `url('./img/descriptionIMG/${description}.png')`;
            break;
        case 'mist':
            document.getElementById('bgWeather').style.backgroundImage = `url('./img/descriptionIMG/${description}.png')`;
            break;
        case 'overcast clouds':
            document.getElementById('bgWeather').style.backgroundImage = `url('./img/descriptionIMG/${description}.png')`;
            break;
    }
}
