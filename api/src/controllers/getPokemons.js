const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemon } = require('../db.js');

async function getPokemons(req, res) {
    try {
        const dbPokemons = await Pokemon.findAll();
        const response = await axios.get(`${URL}`);

        const apiPokemons = await Promise.all(response.data.results.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            const pokemonData = response.data;
            const relevantData = {
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                health: pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat,
                attack: pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat,
                defense: pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat,
                speed: pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: pokemonData.types.map(type => type.type.name)
            };
            return relevantData;
        }));

        const allPokemons = [...dbPokemons, ...apiPokemons];
        res.json(allPokemons);
        
        
    } catch(error){
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = getPokemons;
