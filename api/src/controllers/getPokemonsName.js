const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const { Pokemon } = require('../db');

async function getPokemonByName(req, res) {
    // try {
        const pokemonName = req.query.name.toLowerCase();
        let pokemons = await Pokemon.findAll({ where: { name: pokemonName } });

        if(!pokemons || pokemons.length === 0) {
            const response = await axios.get(`${URL}${pokemonName}`);
            const pokemonData = response.data;

            if (pokemonData) {
                return res.status(200).json(pokemonData);
            } else {
                return res.status(404).send("No existe un pokemon con ese nombre");
            }

        }
        res.status(200).json(pokemons);
    // } catch(error) {
    //     res.status(404).send("No existe un pokemon con ese nombre. SOY EL ULTIMO CATCH")
    // }
}

module.exports = getPokemonByName;