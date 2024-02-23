const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemon } = require('../db.js');

async function getPokemons(req, res) {
    try {
        const dbPokemons = await Pokemon.findAll();
        const response = await axios.get(`${URL}`);

        const ApiPokemons = response.data.results;
        const allPokemons = [...dbPokemons, ...ApiPokemons];
        res.json(allPokemons);
        
        
    } catch(error){
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = getPokemons;
