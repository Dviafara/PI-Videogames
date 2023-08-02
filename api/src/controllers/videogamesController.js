const { Videogame, Genre } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env;


const getVideogames = async () => {
    //DB
    const videogameDB = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    const arrayVideogamesDB = videogameDB.map(videogame => {
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platform: videogame.platform,
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map(genre => genre.name)
        }
    })

    // API
    const arrayVideogamesApi = [];
    for (let i = 1; i <= 5; i++) {
        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        // mapeo y pusheo cada juego
        response.data.results.map(videogame => {
            arrayVideogamesApi.push({
                id: videogame.id,
                name: videogame.name,
                platform: videogame.platforms.map(p => p.platform.name),
                background_image: videogame.background_image,
                released: videogame.released,
                rating: videogame.rating,
                genres: videogame.genres.map(genre => genre.name)
            });
        });
    };
 
    return [...arrayVideogamesDB, ...arrayVideogamesApi];
}


const getVideogamesByName = async (name) => {
    try {
        //DB
        const videogamesDB = await Videogame.findAll({
            where: { name: name },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        const arrayVideogamesDB = videogamesDB.map(videogame => {
            return {
                id: videogame.id,
                name: videogame.name,
                description: videogame.description,
                platform: videogame.platform,
                background_image: videogame.background_image,
                released: videogame.released,
                rating: videogame.rating,
                genres: videogame.genres.map(genre => genre.name)
            }
        })

        //API
        const arrayVideogamesApi = [];
            let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
            response.data.results.map(videogame => {
                arrayVideogamesApi.push({
                    id: videogame.id,
                    name: videogame.name,
                    platform: videogame.platforms.map(e => e.platform.name),
                    background_image: videogame.background_image,
                    released: videogame.released,
                    rating: videogame.rating,
                    genres: videogame.genres.map(genre => genre.name)
                });
            });
        //arrayVideogamesApi = arrayVideogamesApi.filter(game => game.name.toLowerCase() || g.name.toUpperCase())
        
        let videogamesByName = [...arrayVideogamesDB, ...arrayVideogamesApi].slice(0, 15)  // -----> API +  DB
        return videogamesByName;
    } catch (error) {
        throw Error('El juego ingresado no existe')
    }
}


// videogames from API by ID
const getVideogameFromApi = async (id) => {
    const apiVideogames = [];

    const getByAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    apiVideogames.push({
        id: getByAPI?.data?.id,
        name: getByAPI?.data?.name,
        description: getByAPI?.data?.description,  // Solo tiene description si se busca por ID
        platform: getByAPI?.data?.platforms?.map(p => p.platform.name),
        background_image: getByAPI?.data?.background_image,
        released: getByAPI?.data?.released,
        rating: getByAPI?.data?.rating,
        genres: getByAPI?.data?.genres?.map((genre) => genre.name),
    })

    return apiVideogames;
}


// videogames from DB by ID
const getVideogameFromDB = async (id) => {
    let dbVideogames = []

    const getGamesDB = await Videogame.findByPk(
        id,
        {
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });

    dbVideogames.push({
        id: getGamesDB.id,
        name: getGamesDB.name,
        description: getGamesDB.description,
        platform: getGamesDB.platform,
        background_image: getGamesDB.background_image,
        released: getGamesDB.released,
        rating: getGamesDB.rating,
        genres: getGamesDB.genres.map(genre => genre.name)
    })
    return dbVideogames;
}


const createVideogame = async ({ name, description, platform, background_image, released, rating, genre }) => {

    if (!name || !description || !platform || !background_image || !released || !rating || !genre) {
        throw Error('Todos los campos son obligatorios')
    }

    const searchName = await Videogame.findAll({
        where: { name: name }
    })

    if (searchName.length !== 0) throw Error('Este juego ya existe!')

    let getGenreDB = await Genre.findAll({
        where: {
            name: genre
        }
    });

    if (getGenreDB.length === 0) throw Error('Los generos no se cargaron correctamente!')

    let newVideogame = await Videogame.create({
        name,
        description,
        platform,
        background_image,
        released,
        rating: Number(rating),
        genre
    });

    await newVideogame.addGenres(getGenreDB);

    return newVideogame;
}

// Trae todos los videojuegos o los trae por nombre
const getVideogamesController = (name) => {
    if (!name) return getVideogames()
    else return getVideogamesByName(name)
}

// trae video juegos por id
const getVideogamesByIdController = async (id, source) => {
    if (source === 'API') return getVideogameFromApi(id)
    else return getVideogameFromDB(id)
}

// postea videojuego en la base de datos
const postVideogameController = (form) => {
    return createVideogame(form)
}


module.exports = {
    getVideogamesController,
    getVideogamesByIdController,
    postVideogameController,
}