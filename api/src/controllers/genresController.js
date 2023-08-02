const axios = require('axios')
const { Genre } = require('../db')
const { API_KEY } = process.env;


const getGenresController = async () => {

    let response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    let genres = await response.data.results.map(genre => genre.name);

    const count = await Genre.count();

    if (count === 0) {
        genres.forEach(element => {
            Genre.create({ name: element }) 
        })
    }
    return genres;
}

module.exports = { getGenresController }