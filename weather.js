const getWeather = (lat, lng) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=70d890e3f5d9af3e9b703b6ccb3f8267&lang=ru&units=metric`)
        .then(response => response)
}

export default getWeather;