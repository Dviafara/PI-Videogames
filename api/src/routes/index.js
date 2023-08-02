const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require ("./videogamesRouter");
const genresRouter = require ("./genresRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//http://localhost:3001/videogames
router.use("/videogames", videogamesRouter);

//http://localhost:3001/genres
router.use("/genres", genresRouter);

module.exports = router;

