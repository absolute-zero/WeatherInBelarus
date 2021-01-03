const formCity = document.querySelector('#formCity');
const weather = document.querySelector('#weather');
let cities = [];

axios.get(`https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json`)
    .then(response => {
        response.data[0].regions.forEach((el) => {
            el.cities.forEach(cityItem => {
                cities.push(cityItem);
            })
        })

        showCity()
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
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${item.lat}&lon=${item.lng}&appid=70d890e3f5d9af3e9b703b6ccb3f8267&lang=ru&units=metric`)
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