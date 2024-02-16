const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemon } = require('../db.js');

async function getPokemons(req, res) {
    try {
        let pokemons = await Pokemon.findAll();
        if(pokemons.length > 0) {
            res.json(pokemons);
        } else {
            const response = await axios.get(`${URL}`);
            const data =  response.data.results;
            res.json(data);
        }
    } catch(error){
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = getPokemons;
