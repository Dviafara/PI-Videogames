const { getVideogamesController, getVideogamesByIdController, postVideogameController} = require('../controllers/videogamesController')

//traer todos los juegos o traerlos por sus nombres
const getVideogamesHandler = async (req, res) => {
    const { name } = req.query
    try {
        const result = await getVideogamesController(name);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// traer juegos por id
const getVideogameByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'DB' : 'API';
    try {
        const result = await getVideogamesByIdController(id, source);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// crear juego
const postVideogameHandler = async (req, res) => {
    const { name, description, platform, background_image, released, rating, genre } = req.body;
    try {
        const postVideogame = await postVideogameController({ name, description, platform, background_image, released, rating, genre });
        res.status(200).json(postVideogame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    getVideogamesHandler,
    getVideogameByIdHandler,
    postVideogameHandler,
}