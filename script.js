const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8593a7859d86c04e8e28cb8c05cb62cc'
const units = 'metric'
const userCity = document.getElementById('userCity');

const q = userCity.value;
let url = `${baseUrl}?q=${q}&apikey=${apiKey}&units=${units}`

userCity.addEventListener('change', () => {
    url = `${baseUrl}?q=${userCity.value}&apikey=${apiKey}&units=${units}`
    getAllData()
})

const sendRequest = (method, url, body = {}) => {
    return fetch(url, {
        method: method
    })
        .then(res => {return res.json()})
}
const getAllData = () => {
    sendRequest('GET', url)
        .then(data => {
            console.log(data)
            document.getElementById('city').innerText = data.name;
            document.getElementById('temperature').innerText = data.main.temp;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('userLocationMap').innerHTML = `
                <div style="width: 100%; height: 100%"><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${userCity.value}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/collections/drones/">gps drone</a></iframe></div>
            `
        })
}
getAllData()
