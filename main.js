import getCities from "./cities.js";
import getWeather from "./weather.js"

const formCity = document.querySelector('#formCity');
const weather = document.querySelector('#weather');
let cities = [];

getCities()
    .then(response => {
        response.forEach((el) => {
            el.cities.forEach(cityItem => {
               cities.push(cityItem);
            })
        })
        showCity();
    });

const showCity = () => {
    cities.sort((a, b) => a.name > b.name ? 1 : -1);

    cities.forEach(item => {
        let option = document.createElement('option');
        option.innerHTML = item.name;
        formCity.append(option);
    })
}

formCity.addEventListener('change', () => {
    deleteOldWeather();

    cities.forEach(item => {
        if (formCity.value === item.name) {
            getWeather(item.lat, item.lng)
                .then(showWeather)
        }
    })
})

const deleteOldWeather = () => {
    while (weather.firstChild) {
        weather.firstChild.remove();
    }
}

const showWeather = response => {
    response.data.daily.forEach(item => {
        let p = document.createElement('p');
        p.innerHTML = `${new Date(item.dt * 1000).getDate()}/${new Date(item.dt * 1000).getMonth() + 1}
                        &nbsp;&nbsp;Днём: ${Math.round(item.temp.day)}℃
                        &nbsp;&nbsp;&nbsp;&nbsp;Ночью: ${Math.round(item.temp.night)}℃`;
        weather.append(p);
    })
}