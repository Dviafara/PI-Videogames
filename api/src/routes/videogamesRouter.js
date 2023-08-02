const { Router } = require('express')
const { getVideogamesHandler, getVideogameByIdHandler, postVideogameHandler } = require('../handlers/videogamesHandler')

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);                // Traer videojuegos 
videogamesRouter.get('/:id', getVideogameByIdHandler); // Traer videojuegos por su ID
videogamesRouter.post('/', postVideogameHandler);               // Crear un videojuego

module.exports = videogamesRouter;