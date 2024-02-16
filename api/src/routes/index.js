const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require('../controllers/getPokemons');
// const getPokemonId = require('../controllers/getPokemonId');
// const getPokemonsName = require('../controllers/getPokemonsName');
const postPokemons = require('../controllers/postPokemons');
// const getPokemonsType = require('../controllers/getPokemonsType')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons);
router.get('/pokemons/:idPokemon');
router.get('/pokemons/name?="..."');
router.post('/pokemons', postPokemons);
router.get('/types');


module.exports = router;