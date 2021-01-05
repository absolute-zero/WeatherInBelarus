let getCities = () => {
    return axios.get(`https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json`)
        .then(response => response.data[0].regions);
}
 export default getCities;